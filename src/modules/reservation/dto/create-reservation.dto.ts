import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  parking_spot_number: number;

  @IsDateString()
  reserved_date: string;

  @IsString()
  reserved_time: string;
}
