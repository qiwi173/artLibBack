import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtDto } from './dto/art.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @HttpCode(200)
  @Get('all')
  async getAllByArtist(@Body('artistId') artistId: string) {
    return this.artService.getByArtist(artistId);
  }

  @HttpCode(200)
  @Get()
  async getOne(@Body('id') id: string) {
    return this.artService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async createArt(
    @CurrentUser('role') role: string,
    @Body('dto') dto: ArtDto,
    @Body('artistId') artistId: string,
    @Body('genreId') genreId: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.artService.create(artistId, genreId, dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: ArtDto,
    @CurrentUser('role') role: string,
    @Param('id') id: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.artService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.artService.delete(id);
  }
}
