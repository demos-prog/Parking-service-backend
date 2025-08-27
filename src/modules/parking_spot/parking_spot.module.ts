import { Module } from '@nestjs/common';
import { ParkingSpotService } from './parking_spot.service';
import { ParkingSpotController } from './parking_spot.controller';

@Module({
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
})
export class ParkingSpotModule {}
