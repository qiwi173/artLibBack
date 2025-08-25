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
import { AwardService } from './award.service';
import { AwardDto } from './dto/award.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @HttpCode(200)
  @Get('all')
  async getAllAwards() {
    return this.awardService.getAll();
  }

  @HttpCode(200)
  @Get()
  async getAward(@Body('id') id: string) {
    return this.awardService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() dto: AwardDto) {
    return this.awardService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() dto: AwardDto) {
    return this.awardService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.awardService.delete(id);
  }
}
