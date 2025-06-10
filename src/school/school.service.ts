import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.school.findMany();
  }

  async getById(id: string) {
    return this.prisma.school.findUnique({
      where: { id },
      include: { artists: true },
    });
  }

  async create(dto: SchoolDto) {
    return this.prisma.school.create({ data: dto });
  }

  async update(id: string, dto: Partial<SchoolDto>) {
    return this.prisma.school.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.school.delete({ where: { id } });
  }
}
