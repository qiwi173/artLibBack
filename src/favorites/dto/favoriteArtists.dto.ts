import { IsString } from 'class-validator';

export class FavoriteArtistDto {
  @IsString()
  userId: string;

  @IsString()
  artistId: string;
}
