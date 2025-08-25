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
import { MuseumService } from './museum.service';
import { MuseumDto } from './dto/museum.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('museum')
export class MuseumController {
  constructor(private readonly museumService: MuseumService) {}

  @HttpCode(200)
  @Get('all')
  async getAllGenres() {
    return this.museumService.getAll();
  }

  @HttpCode(200)
  @Get()
  async getGenre(@Body('id') id: string) {
    return this.museumService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() dto: MuseumDto) {
    return this.museumService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() dto: MuseumDto) {
    return this.museumService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.museumService.delete(id);
  }
}
