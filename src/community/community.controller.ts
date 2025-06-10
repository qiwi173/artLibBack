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
import { CommunityService } from './community.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CommunityDto } from './dto/community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @HttpCode(200)
  @Get('all')
  async getAllCommunitys() {
    return this.communityService.getAll();
  }

  @HttpCode(200)
  @Get()
  async getCommunity(@Body('id') id: string) {
    return this.communityService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('role') role: string, @Body() dto: CommunityDto) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.communityService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: CommunityDto,
    @CurrentUser('role') role: string,
  ) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.communityService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('role') role: string) {
    if (role !== 'admin')
      throw new UnauthorizedException(
        'Это дeйствие доступно только администратору',
      );

    return this.communityService.delete(id);
  }
}
