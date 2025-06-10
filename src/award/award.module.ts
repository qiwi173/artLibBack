import { Module } from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AwardController],
  providers: [AwardService, PrismaService],
})
export class AwardModule {}
