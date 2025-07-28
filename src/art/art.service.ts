import { Injectable } from '@nestjs/common';
import { ArtDto } from './dto/art.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtService {
  constructor(private prisma: PrismaService) {}

  async getByArtist(artistId: string) {
    return this.prisma.art.findMany({ where: { artistId } });
  }

  async getById(id: string) {
    return this.prisma.art.findUnique({ where: { id } });
  }

  async create(dto: ArtDto) {
    return this.prisma.art.create({
      data: {
        artName: dto.artName,
        artImage: dto.artImage,
        artDescription: dto.artDescription,
        productionYear: dto.productionYear,
        measurements: dto.measurements,
        artist: {
          connect: {
            id: dto.artistId,
          },
        },
        genre: {
          connect: {
            id: dto.genreId,
          },
        },
      },
    });
  }

  async update(id: string, dto: Partial<ArtDto>) {
    return this.prisma.art.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.art.delete({ where: { id } });
  }
}
