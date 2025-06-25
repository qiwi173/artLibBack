import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ArtistDto } from './dto/artist.dto';
import { NewsDto } from 'src/news/dto/news.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  //не забыть валидацию на админа

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.artistService.getAllArtists();
  }

  @HttpCode(200)
  @Get('artist')
  async getArtist(@Body('artistId') artistId: string) {
    return this.artistService.getById(artistId);
  }

  @HttpCode(200)
  @Post('create')
  @Auth()
  async createNews(@Body() dto: ArtistDto, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это действие доступно только администратору',
      );

    return this.artistService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: ArtistDto,
    @CurrentUser('role') role: string,
    @Param('id') id: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это действие доступно только администратору',
      );

    return this.artistService.update(dto, id);
  }

  @HttpCode(204)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это действие доступно только администратору',
      );

    return this.artistService.delete(id);
  }

//  @HttpCode(200)
//  @Put('toFavorites/:id')
//  @Auth()
//  async addToFavorites(
//    @CurrentUser('id') userId: string,
//    @Param('id') id: string,
//  ) {
//    return this.artistService.addToFavorites(userId, id);
//  }
}
