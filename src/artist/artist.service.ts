import { Injectable } from '@nestjs/common';
import { Artist } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    this.prisma.artist.findMany({ include: { arts: true } });
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
    return this.prisma.news.delete({
      where: {
        id: artistId,
      },
    });
  }
}
