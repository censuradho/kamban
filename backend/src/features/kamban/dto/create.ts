import { IsString } from 'class-validator';

export class CreateKambanDto {
  @IsString()
  name: string;
}
