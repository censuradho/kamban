import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ColumnService } from './column.service';
import { KambanController } from './kamban.controller';
import { KambanService } from './kamban.service';
import { TaskService } from './task.service';

@Module({
  controllers: [KambanController],
  providers: [KambanService, PrismaService, ColumnService, TaskService],
})
export class KambanModule {}
