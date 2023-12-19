import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async getTrips() {
    try {
      const trips = await this.prisma.trips.findMany();
      return trips;
    } catch (err) {
      return err;
    }
  }
}
