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
import { SchoolService } from './school.service';
import { SchoolDto } from './dto/school.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @HttpCode(200)
  @Get('all')
  async getAllSchools() {
    return this.schoolService.getAll();
  }

  @HttpCode(200)
  @Get()
  async getSchool(@Body('id') id: string) {
    return this.schoolService.getById(id);
  }

  @HttpCode(200)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: SchoolDto) {
    return this.schoolService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() dto: SchoolDto) {
    return this.schoolService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.schoolService.delete(id);
  }
}
