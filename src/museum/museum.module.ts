import { Module } from '@nestjs/common';
import { MuseumService } from './museum.service';
import { MuseumController } from './museum.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MuseumController],
  providers: [MuseumService, PrismaService],
})
export class MuseumModule {}
