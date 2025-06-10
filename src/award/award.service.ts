import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AwardDto } from './dto/award.dto';

@Injectable()
export class AwardService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.award.findMany();
  }

  async getById(id: string) {
    return this.prisma.award.findUnique({
      where: { id },
      include: { artists: true },
    });
  }

  async create(dto: AwardDto) {
    return this.prisma.award.create({ data: dto });
  }

  async update(id: string, dto: Partial<AwardDto>) {
    return this.prisma.award.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.award.delete({ where: { id } });
  }
}
