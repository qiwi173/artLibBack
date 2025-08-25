import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
//import { CurrentUser } from 'src/auth/decorators/user.decorator';
//import { Auth } from 'src/auth/decorators/auth.decorator';
import { ArtistDto } from './dto/artist.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

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
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createNews(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Body() dto: ArtistDto, @Param('id') id: string) {
    return this.artistService.update(dto, id);
  }

  @HttpCode(204)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
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
