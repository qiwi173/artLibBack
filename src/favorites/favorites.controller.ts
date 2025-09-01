import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoriteArtistDto } from './dto/favoriteArtists.dto';
import { FavoriteGenreDto } from './dto/favotiteGenres.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Auth()
  async getFavorites(@CurrentUser('id') userId: string) {
    return this.favoritesService.getAllUsersFavorites(userId);
  }

  @Post('artist')
  async addFavoriteArtist(@Body() dto: FavoriteArtistDto) {
    return this.favoritesService.addFavoriteArtist(dto.userId, dto.artistId);
  }

  @HttpCode(204)
  @Delete('artist')
  async removeFavoriteArtist(@Body() dto: FavoriteArtistDto) {
    await this.favoritesService.removeFavoriteArtist(dto.userId, dto.artistId);
  }

  @Post('genre')
  async addFavoriteGenre(@Body() dto: FavoriteGenreDto) {
    return this.favoritesService.addFavoriteGenre(dto.userId, dto.genreId);
  }

  @HttpCode(204)
  @Delete('genre')
  async removeFavoriteGenre(@Body() dto: FavoriteGenreDto) {
    await this.favoritesService.removeFavoriteGenre(dto.userId, dto.genreId);
  }
}
