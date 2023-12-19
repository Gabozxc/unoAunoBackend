import { TripsService } from './trips.service';
import { Controller, Get } from '@nestjs/common';

@Controller('trips')
export class TripsController {
  constructor(private tripsServices: TripsService) {}

  @Get('getTrips')
  getTravelers() {
    return this.tripsServices.getTrips();
  }
}
