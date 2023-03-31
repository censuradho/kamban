import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { ForbiddenException } from 'src/error-handlers/errors';
import { CreateColumnDto } from './dto/column/create';
import { UpdateColumnDto } from './dto/column/update';
import { COLUMN_ERROR_MESSAGES } from './errors';
import { KambanService } from './kamban.service';

@Injectable()
export class ColumnService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kambanService: KambanService,
  ) {}

  async create(kambanId: string, payload: CreateColumnDto) {
    const count = await this.prisma.column.count();

    await this.kambanService.findById(kambanId);

    return await this.prisma.column.create({
      data: {
        id: randomUUID(),
        name: payload.name,
        position: count + 1,
        kamban: {
          connect: {
            id: kambanId,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const column = await this.prisma.column.findUnique({
      where: {
        id,
      },
    });

    if (!column) throw new ForbiddenException(COLUMN_ERROR_MESSAGES.NOT_FOUND);

    return column;
  }

  async findMany(kambanId: string) {
    return await this.prisma.column.findMany({
      where: {
        kamban_id: kambanId,
      },
    });
  }

  async update(id: string, payload: UpdateColumnDto) {
    await this.findById(id);

    const { name } = payload;

    await this.prisma.column.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.column.delete({
      where: {
        id,
      },
    });
  }

  async move(kambanId: string, id: string, to: number) {
    const column = await this.findById(id);

    if (column.position === to) return;

    const columnOnPosition = await this.prisma.column.findFirst({
      where: {
        kamban_id: kambanId,
        position: to,
      },
    });

    if (columnOnPosition)
      await this.prisma.column.update({
        where: {
          id: columnOnPosition.id,
        },
        data: {
          position: column.position,
        },
      });

    const columns = await this.prisma.column.findMany({
      where: {
        kamban_id: kambanId,
      },
    });

    if (columns.length < to)
      throw new ForbiddenException(
        COLUMN_ERROR_MESSAGES.POSITION_IS_BIGGER_THAN_COLUMNS,
      );

    await this.prisma.column.update({
      where: {
        id: column.id,
      },
      data: {
        position: to,
      },
    });
  }
}
