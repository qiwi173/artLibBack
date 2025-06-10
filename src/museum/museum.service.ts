import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MuseumDto } from './dto/museum.dto';

@Injectable()
export class MuseumService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.museum.findMany();
  }

  async getById(id: string) {
    return this.prisma.museum.findUnique({
      where: { id },
      include: { arts: true },
    });
  }

  async create(dto: MuseumDto) {
    return this.prisma.museum.create({ data: dto });
  }

  async update(id: string, dto: Partial<MuseumDto>) {
    return this.prisma.museum.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.museum.delete({ where: { id } });
  }
}
