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
import { SchoolService } from './school.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { SchoolDto } from './dto/school.dto';

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
  @Post()
  @Auth()
  async create(@CurrentUser('role') role: string, @Body() dto: SchoolDto) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.schoolService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: SchoolDto,
    @CurrentUser('role') role: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.schoolService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.schoolService.delete(id);
  }
}
