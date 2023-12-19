import { Module } from '@nestjs/common';

import { TravelersController } from './travelers.controller';
import { TravelersService } from './travelers.service';
import { PrismaService } from './../prisma/prisma.service';

@Module({
  controllers: [TravelersController],
  providers: [TravelersService, PrismaService],
})
export class TravelersModule {}
