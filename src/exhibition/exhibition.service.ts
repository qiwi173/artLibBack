import { Injectable } from '@nestjs/common';
import { ExhibitionDto } from './dto/exhibition.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExhibitionService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.exhibition.findMany();
  }

  async getById(id: string) {
    return this.prisma.exhibition.findUnique({
      where: { id },
      include: { arts: true },
    });
  }

  async create(dto: ExhibitionDto) {
    return this.prisma.exhibition.create({ data: dto });
  }

  async update(id: string, dto: Partial<ExhibitionDto>) {
    return this.prisma.exhibition.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.exhibition.delete({ where: { id } });
  }
}
