import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(
    login: string,
    password: string,
    email: string,
    role: string = 'regular',
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        login,
        password,
        email,
        role,
      },
    });
  }

  async updateUser(
    id: string,
    login: string,
    password: string,
    email: string,
    role: string,
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: { login, password, email, role },
    });
  }

  async deleteUser(id: string) {
    const deleted = await this.prisma.user.delete({ where: { id } });
    if (deleted) {
      return 'success';
    } else {
      return 'oops, something wrong';
    }
  }
}
