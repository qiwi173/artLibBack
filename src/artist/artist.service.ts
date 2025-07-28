import { Injectable } from '@nestjs/common';
import { Artist } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return this.prisma.artist.findMany({ include: { arts: true } });
  }

  async getById(id: string): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { id },
      include: {
        arts: true,
        communities: true,
        awards: true,
        schools: true,
      },
    });
  }

  async create(dto: ArtistDto) {
    return this.prisma.artist.create({
      data: {
        ...dto,
      },
    });
  }

  async update(dto: Partial<ArtistDto>, artistId: string) {
    return this.prisma.artist.update({
      where: {
        id: artistId,
      },
      data: dto,
    });
  }

  async delete(artistId: string) {
    return this.prisma.artist.delete({
      where: {
        id: artistId,
      },
    });
  }

//  async addToFavorites(userId: string, artistId: string) {
//    const { createdAt, updatedAt, ...user } = await this.prisma.user.findUnique(
//      {
//        where: { id: userId },
//        include: { favoriteArtists: true },
//      },
//    );

//    const { favoriteArtists } = user;

//    const artist = await this.prisma.artist.findUnique({
//      where: { id: artistId },
//    });

//    favoriteArtists.push(artist);

//    return this.prisma.user.update({
//      where: { id: userId },
//      data: favoriteArtists,
//      include: { favoriteArtists: true },
//    });
//  }

//  async removeFromFavorites() {}
}
