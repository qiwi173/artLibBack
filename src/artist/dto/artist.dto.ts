import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  artistName: string;

  @IsString()
  biography: string;

  @IsString()
  yearsOfLife: string;
}
