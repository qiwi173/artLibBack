import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Materials } from 'generated/prisma';

export class ArtDto {
  @IsString()
  artName: string;

  @IsString()
  artImage: string;

  @IsString()
  artDescription: string;

  @IsString()
  productionYear: string;

  @IsEnum(Materials)
  @IsOptional()
  @Transform(({ value }) => '' + value.toLoverCase())
  materials?: Materials;

  @IsString()
  measurements: string;

  @IsNumber()
  @IsOptional()
  cost?: number;

  @IsString()
  @IsOptional()
  salesHistory?: string;
}
