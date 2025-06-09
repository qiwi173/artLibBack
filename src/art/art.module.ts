import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArtController],
  providers: [ArtService, PrismaService],
})
export class ArtModule {}
