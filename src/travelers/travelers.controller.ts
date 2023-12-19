import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { TravelersService } from './travelers.service';
import { NewTravelerDTO, EditTravelerDTO, GetTravelerDTO } from './dto';

@Controller('travelers')
@ApiTags('Travelers CRUD')
export class TravelersController {
  constructor(private travelerService: TravelersService) {}

  @Post('newTraveler')
  @ApiBody({ type: NewTravelerDTO })
  createTraveler(@Body() traveler: NewTravelerDTO) {
    return this.travelerService.newTraveler(traveler);
  }

  @Get('getTraveler')
  getTraveler(@Query() traveler: GetTravelerDTO) {
    return this.travelerService.getTraveler(traveler);
  }

  @Get('getTravelers')
  getTravelers(@Query('page') page: number) {
    return this.travelerService.getTravelers(page);
  }

  @Put('editTraveler')
  @ApiBody({ type: EditTravelerDTO })
  editTraveler(@Body() traveler: EditTravelerDTO) {
    return this.travelerService.editTraveler(traveler);
  }

  @Delete('deleteTraveler')
  deleteTraveler(@Query() traveler: GetTravelerDTO) {
    return this.travelerService.deleteTraveler(traveler);
  }
}
