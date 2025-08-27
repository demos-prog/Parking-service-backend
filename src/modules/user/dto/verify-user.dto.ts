import { IsString, MinLength } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @MinLength(8)
  password: string;
}
