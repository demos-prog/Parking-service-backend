import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParkingSpotDto } from './dto/create-parking_spot.dto';
import { UpdateParkingSpotDto } from './dto/update-parking_spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParkingSpotService {
  constructor(private prisma: PrismaService) {}

  async create(createParkingSpotDto: CreateParkingSpotDto) {
    const existingSpot = await this.findByName(createParkingSpotDto.name);
    if (existingSpot) {
      throw new BadRequestException(
        'Parkingspot with this name already exists',
      );
    }

    return this.prisma.parking_spot.create({
      data: createParkingSpotDto,
    });
  }

  findAll() {
    return this.prisma.parking_spot.findMany();
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return this.prisma.parking_spot.findUnique({ where: { id } });
  }

  findByName(name: string) {
    if (!name) {
      throw new BadRequestException('ID is required');
    }

    return this.prisma.parking_spot.findFirst({ where: { name } });
  }

  async update(id: number, updateParkingSpotDto: UpdateParkingSpotDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const targetParkingSpot = await this.findOne(id);
    if (!targetParkingSpot) {
      throw new BadRequestException(`Parkingspot with id: ${id} doesn't exist`);
    }

    const data: any = {};
    if (updateParkingSpotDto.name) {
      if (targetParkingSpot.name === updateParkingSpotDto.name) {
        throw new BadRequestException(
          'Parkingspot with this name already exists',
        );
      }
      data.name = updateParkingSpotDto.name;
    }

    if (updateParkingSpotDto.location)
      data.location = updateParkingSpotDto.location;

    return this.prisma.parking_spot.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const targetParkingSpot = await this.findOne(id);
    if (!targetParkingSpot) {
      throw new BadRequestException(`Parkingspot with ID ${id} doesnt exist`);
    }
    return this.prisma.parking_spot.delete({ where: { id } });
  }
}
