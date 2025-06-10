import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommunityDto } from './dto/community.dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.community.findMany();
  }

  async getById(id: string) {
    return this.prisma.community.findUnique({
      where: { id },
      include: { artists: true, exhibitions: true },
    });
  }

  async create(dto: CommunityDto) {
    return this.prisma.community.create({ data: dto });
  }

  async update(id: string, dto: Partial<CommunityDto>) {
    return this.prisma.community.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.community.delete({ where: { id } });
  }
}
