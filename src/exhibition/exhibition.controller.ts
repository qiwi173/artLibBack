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
import { ExhibitionService } from './exhibition.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ExhibitionDto } from './dto/exhibition.dto';

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
  @Auth()
  async create(@CurrentUser('role') role: string, @Body() dto: ExhibitionDto) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.exhibitionService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: ExhibitionDto,
    @CurrentUser('role') role: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.exhibitionService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.exhibitionService.delete(id);
  }
}
