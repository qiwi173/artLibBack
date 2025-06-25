import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavoriteArtist(userId: string, artistId: string) {
    const existing = await this.prisma.favoriteArtist.findUnique({
      where: {
        userId_artistId: {
          userId,
          artistId,
        },
      },
    });

    if (existing) {
      throw new NotFoundException('Этот художник уже добавлен в избранное');
    }

    return this.prisma.favoriteArtist.create({
      data: {
        user: { connect: { id: userId } },
        artist: { connect: { id: artistId } },
      },
    });
  }

  async removeFavoriteArtist(userId: string, artistId: string) {
    const existing = await this.prisma.favoriteArtist.findUnique({
      where: {
        userId_artistId: { userId, artistId },
      },
    });

    if (!existing) {
      throw new NotFoundException('Такого избранного не найдено');
    }

    return this.prisma.favoriteArtist.delete({
      where: {
        userId_artistId: { userId, artistId },
      },
    });
  }

  async addFavoriteGenre(userId: string, genreId: string) {
    const existing = await this.prisma.favoriteGenre.findUnique({
      where: {
        userId_genreId: {
          userId,
          genreId,
        },
      },
    });

    if (existing) {
      throw new NotFoundException('Этот жанр уже добавлен в избранное');
    }

    return this.prisma.favoriteGenre.create({
      data: {
        user: { connect: { id: userId } },
        genre: { connect: { id: genreId } },
      },
    });
  }

  async removeFavoriteGenre(userId: string, genreId: string) {
    const existing = await this.prisma.favoriteGenre.findUnique({
      where: {
        userId_genreId: { userId, genreId },
      },
    });

    if (!existing) {
      throw new NotFoundException('Такого избранного не найдено');
    }

    return this.prisma.favoriteGenre.delete({
      where: {
        userId_genreId: { userId, genreId },
      },
    });
  }
}
