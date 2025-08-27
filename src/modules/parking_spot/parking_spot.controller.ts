import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingSpotService } from './parking_spot.service';
import { CreateParkingSpotDto } from './dto/create-parking_spot.dto';
import { UpdateParkingSpotDto } from './dto/update-parking_spot.dto';

@Controller('parking-spot')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Post()
  create(@Body() createParkingSpotDto: CreateParkingSpotDto) {
    return this.parkingSpotService.create(createParkingSpotDto);
  }

  @Get()
  findAll() {
    return this.parkingSpotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSpotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingSpotDto: UpdateParkingSpotDto) {
    return this.parkingSpotService.update(+id, updateParkingSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSpotService.remove(+id);
  }
}
