import { IsUUID } from 'class-validator';

export class MoveTaskToColumnParams {
  @IsUUID()
  fromColumnId: string;

  @IsUUID()
  toColumnId: string;

  @IsUUID()
  taskId: string;
}
