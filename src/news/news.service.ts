import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NewsDto } from './dto/news.dto';
import { News } from 'generated/prisma';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getOneById(id: string) {
    return this.prisma.news.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllNews() {
    return this.prisma.news.findMany();
  }

  async getAllNewsCreatedByCurrentUser(userId: string) {
    console.log(userId, 'service');
    return this.prisma.news.findMany({
      where: {
        userId,
      },
    });
  }

  async create(dto: NewsDto, userId: string) {
    return this.prisma.news.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<NewsDto>, newsId: string, userId: string) {
    return this.prisma.news.update({
      where: {
        userId,
        id: newsId,
      },
      data: dto,
    });
  }

  async delete(newsId: string) {
    return this.prisma.news.delete({
      where: {
        id: newsId,
      },
    });
  }
}
