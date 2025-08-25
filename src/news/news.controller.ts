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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { NewsDto } from './dto/news.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.newsService.getAllNews();
  }

  @HttpCode(200)
  @Get('current-user')
  @Auth()
  async getAllByCurrentUser(@CurrentUser('id') userId: string) {
    return this.newsService.getAllNewsCreatedByCurrentUser(userId);
  }

  @HttpCode(200)
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.newsService.getOneById(id);
  }

  @HttpCode(200)
  @Post('create')
  @Auth()
  async createNews(
    @Body() dto: NewsDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    if (role == 'admin') {
      dto.status = 'approved';
    } else {
      dto.status = 'not_approved';
    }

    return this.newsService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: NewsDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.newsService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.newsService.delete(id);
  }
}
