import { Transform } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

export class MoveParamsDto {
  @IsUUID()
  kambanId: string;

  @IsUUID()
  id: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  position: number;
}
