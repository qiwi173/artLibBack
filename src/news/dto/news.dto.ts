import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { NewsStatus } from 'generated/prisma';

export class NewsDto {
  @IsString()
  title: string;

  @IsEnum(NewsStatus)
  @IsOptional()
  @Transform(({ value }) => '' + value.toLoverCase())
  status?: NewsStatus;

  @IsDate()
  releaseDate: Date;

  @IsString()
  category: string;

  @IsString()
  content: string;
}
