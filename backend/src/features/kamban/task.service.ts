import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ForbiddenException } from 'src/error-handlers/errors';
import { ColumnService } from './column.service';
import { CreateTaskDto } from './dto/column/task/create';
import { UpdateTaskDto } from './dto/column/task/update';
import { COLUMN_ERROR_MESSAGES, TASK_ERROR_MESSAGES } from './errors';

@Injectable()
export class TaskService {
  constructor(
    private readonly columnService: ColumnService,
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) throw new ForbiddenException(TASK_ERROR_MESSAGES.NOT_FOUND);

    return task;
  }

  async create(columnId: string, payload: CreateTaskDto) {
    await this.columnService.findById(columnId);

    const { name, description } = payload;

    await this.prisma.task.create({
      data: {
        name,
        description,
        due_date: payload?.due_date,
        column: {
          connect: {
            id: columnId,
          },
        },
      },
    });
  }

  async update(id: string, payload: UpdateTaskDto) {
    await this.findById(id);

    const { name, description } = payload;

    await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
