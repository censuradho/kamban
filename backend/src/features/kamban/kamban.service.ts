import { ForbiddenException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateKambanDto } from './dto/create';
import { UpdateKambanDto } from './dto/update';
import { KAMBAN_ERROR_MESSAGES } from './errors';
@Injectable()
export class KambanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateKambanDto) {
    return await this.prisma.kamban.create({
      data: {
        id: randomUUID(),
        name: payload.name,
      },
    });
  }

  async findAll() {
    return this.prisma.kamban.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  async findById(id: string) {
    const kamban = await this.prisma.kamban.findUnique({
      where: {
        id,
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!kamban) throw new ForbiddenException(KAMBAN_ERROR_MESSAGES.NOT_FOUND);

    return kamban;
  }

  async update(id: string, payload: UpdateKambanDto) {
    await this.prisma.kamban.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.kamban.delete({
      where: {
        id,
      },
    });
  }
}
