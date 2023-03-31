import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
