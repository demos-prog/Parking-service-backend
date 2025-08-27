import { IsString, MinLength } from 'class-validator';

export class CreateParkingSpotDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(8)
  location: string;
}
