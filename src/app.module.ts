import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingSpotModule } from './modules/parking_spot/parking_spot.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [PrismaModule, UserModule, ParkingSpotModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
