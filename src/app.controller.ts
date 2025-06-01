import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    return this.appService.getAllUsers();
  }

  @Post('users') createUser(
    @Body('login') login: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('role') role: string,
  ) {
    return this.appService.createUser(login, password, email, role);
  }

  @Put('users/:id') updateUser(
    @Param('id') id: string,
    @Body('login') login: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('role') role: string,
  ) {
    return this.appService.updateUser(id, login, password, email, role);
  }

  @Delete('users/:id') deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
