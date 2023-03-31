import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/column/create';
import { MoveParamsDto } from './dto/column/move';
import { CreateTaskDto } from './dto/column/task/create';
import { UpdateTaskDto } from './dto/column/task/update';
import { UpdateColumnDto } from './dto/column/update';
import { CreateKambanDto } from './dto/create';
import { UpdateKambanDto } from './dto/update';
import { KambanService } from './kamban.service';
import { TaskService } from './task.service';

@Controller('kamban')
export class KambanController {
  constructor(
    private readonly service: KambanService,
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService,
  ) {}

  @Post()
  async create(@Body() body: CreateKambanDto) {
    return await this.service.create(body);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Put(':id')
  async update(@Body() body: UpdateKambanDto, @Param('id') id: string) {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Post(':id/column')
  async createColumn(@Param('id') id: string, @Body() body: CreateColumnDto) {
    return await this.columnService.create(id, body);
  }

  @Get(':id/column')
  async findManyColumns(@Param('id') id: string) {
    return await this.columnService.findMany(id);
  }

  @Put('column/:id')
  async updateColumn(@Param('id') id: string, @Body() body: UpdateColumnDto) {
    return this.columnService.update(id, body);
  }

  @Delete('column/:id')
  async deleteColumn(@Param('id') id: string) {
    return this.columnService.delete(id);
  }

  @Patch(':kambanId/column/:id/move/:position')
  async moveColumn(@Param() params: MoveParamsDto) {
    const { kambanId, id, position } = params;

    return this.columnService.move(kambanId, id, position);
  }

  @Post('column/:id/task')
  async createTask(@Param('id') id: string, @Body() body: CreateTaskDto) {
    await this.taskService.create(id, body);
  }

  @Put('column/task/:id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    await this.taskService.update(id, body);
  }

  @Delete('column/task/:id')
  async deleteTask(@Param('id') id: string) {
    await this.taskService.delete(id);
  }
}
