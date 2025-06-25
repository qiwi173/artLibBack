import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { news: true, favoriteArtists: true, favoriteGenres: true },
    });
  }

  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { news: true },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);
    const { password, ...rest } = profile;
    return rest;
  }
  async create(dto: AuthDto): Promise<User> {
    const user = {
      email: dto.email,
      password: await hash(dto.password),
    };

    return this.prisma.user.create({ data: user });
  }

  async update(id: string, dto: Partial<UserDto>) {
    let data = dto;

    if (data.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        userName: true,
        email: true,
      },
    });
  }
}
