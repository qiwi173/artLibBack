import { IsString } from 'class-validator';

export class FavoriteGenreDto {
  @IsString()
  userId: string;

  @IsString()
  genreId: string;
}
