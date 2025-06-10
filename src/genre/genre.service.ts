import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.genre.findMany();
  }

  async getById(id: string) {
    return this.prisma.genre.findUnique({ where: { id } });
  }

  async create(dto: GenreDto) {
    return this.prisma.genre.create({ data: dto });
  }

  async update(id: string, dto: Partial<GenreDto>) {
    return this.prisma.genre.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.genre.delete({ where: { id } });
  }
}
