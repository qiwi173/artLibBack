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
import { ExhibitionService } from './exhibition.service';
import { ExhibitionDto } from './dto/exhibition.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('exhibition')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @HttpCode(200)
  @Get('all')
  async getAllExhibitions() {
    return this.exhibitionService.getAll();
  }

  @HttpCode(200)
  @Get()
  async getExhibition(@Body('id') id: string) {
    return this.exhibitionService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() dto: ExhibitionDto) {
    return this.exhibitionService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() dto: ExhibitionDto) {
    return this.exhibitionService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.exhibitionService.delete(id);
  }
}
