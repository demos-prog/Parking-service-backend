import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  create(createReservationDto: CreateReservationDto) {
    return this.prisma.reservation.create({ data: createReservationDto });
  }

  findAll() {
    return this.prisma.reservation.findMany();
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return this.prisma.reservation.findUnique({ where: { id } });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const targetResarvation = await this.findOne(id);
    if (!targetResarvation) {
      throw new ConflictException(`There is no reservation with ID: ${id}`);
    }

    const data: any = {};
    if (updateReservationDto.user_id)
      data.user_id = updateReservationDto.user_id;
    if (updateReservationDto.parking_spot_number)
      data.parking_spot_number = updateReservationDto.parking_spot_number;
    if (updateReservationDto.reserved_date)
      data.reserved_date = updateReservationDto.reserved_date;
    if (updateReservationDto.reserved_time)
      data.reserved_time = updateReservationDto.reserved_time;

    return this.prisma.reservation.update({ where: { id }, data });
  }

  remove(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return this.prisma.reservation.delete({ where: { id } });
  }
}
