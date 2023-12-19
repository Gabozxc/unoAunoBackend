import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NewTravelerDTO, EditTravelerDTO, GetTravelerDTO } from './dto';

@Injectable()
export class TravelersService {
  constructor(private prisma: PrismaService) {}

  async newTraveler(travelerClient: NewTravelerDTO) {
    try {
      const repeatDocument = await this.prisma.travelers.findFirst({
        where: { document: travelerClient.document },
      });

      if (repeatDocument) {
        throw new HttpException(
          {
            message: 'The document already exists in the database',
            status: HttpStatus.BAD_REQUEST,
            error: 'The document already exist',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const dateOfBirth = new Date(travelerClient.date_of_birth).toISOString();
      const traveler = await this.prisma.travelers.create({
        data: {
          name: travelerClient.name,
          document: travelerClient.document,
          date_of_birth: dateOfBirth,
          phone: travelerClient.phone,
          trips: [],
        },
        select: {
          id: true,
          name: true,
        },
      });
      return traveler;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getTraveler(travelerDTO: GetTravelerDTO) {
    try {
      const traveler = await this.prisma.travelers.findFirst({
        where: { id: travelerDTO.idDocument },
      });

      if (!traveler) {
        throw new NotFoundException('Viajero no encontrado');
      }

      const trips = await this.prisma.trips.findMany({
        where: {
          id: {
            in: traveler.trips,
          },
        },
      });

      const travelerWithTrips = {
        ...traveler,
        trips: trips,
      };

      return travelerWithTrips;
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }

  async getTravelers(page: number) {
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
      const travelers = await this.prisma.travelers.findMany({
        skip: offset,
        take: limit,
      });
      const totalTravelers = await this.prisma.travelers.count();
      const totalPages = Math.ceil(totalTravelers / limit);
      const pageTravelers = {
        travelers,
        page,
        size: limit,
        totalPages,
      };
      return pageTravelers;
    } catch (err) {
      return err;
    }
  }

  async editTraveler(travelerDTO: EditTravelerDTO) {
    try {
      const updateData: any = {
        name: travelerDTO.name || undefined,
        document: travelerDTO.document || undefined,
        date_of_birth: travelerDTO.date_of_birth || undefined,
        phone: travelerDTO.phone || undefined,
      };

      if (travelerDTO.trips) {
        updateData.trips = {
          set: travelerDTO.trips,
        };
      }

      const traveler = await this.prisma.travelers.update({
        where: { id: travelerDTO.id },
        data: updateData,
      });
      return traveler;
    } catch (err) {
      return err;
    }
  }

  async deleteTraveler(travelerDTO: GetTravelerDTO) {
    try {
      const traveler = await this.prisma.travelers.delete({
        where: { id: travelerDTO.idDocument },
      });
      return traveler;
    } catch (err) {
      return err;
    }
  }
}
