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
import { AwardService } from './award.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { AwardDto } from './dto/award.dto';

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
  @Auth()
  async create(@CurrentUser('role') role: string, @Body() dto: AwardDto) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.awardService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: AwardDto,
    @CurrentUser('role') role: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.awardService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.awardService.delete(id);
  }
}
