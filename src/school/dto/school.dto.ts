import { IsString } from 'class-validator';

export class SchoolDto {
  @IsString()
  schoolName: string;

  @IsString()
  schoolDescription: string;
}
