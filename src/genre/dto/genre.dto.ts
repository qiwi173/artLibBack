import { IsOptional, IsString } from 'class-validator';

export class GenreDto {
  @IsString()
  genreName: string;

  @IsString()
  @IsOptional()
  genreDescription?: string;
}
