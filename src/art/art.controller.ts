import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtDto } from './dto/art.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createArt(@Body() dto: ArtDto) {
    return this.artService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Body() dto: ArtDto, @Param('id') id: string) {
    return this.artService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.artService.delete(id);
  }
}
