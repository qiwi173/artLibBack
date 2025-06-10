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
import { GenreService } from './genre.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { GenreDto } from './dto/genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @HttpCode(200)
  @Get('all')
  async getAllGenres() {
    return this.genreService.getAll();
  }

  @HttpCode(200)
  @Get()
  async getGenre(@Body('id') id: string) {
    return this.genreService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('role') role: string, @Body() dto: GenreDto) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.genreService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: GenreDto,
    @CurrentUser('role') role: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.genreService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.genreService.delete(id);
  }
}
