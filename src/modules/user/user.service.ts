import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { hashPassword, verifyPassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
  }

  findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.prisma.user.findUnique({ where: { email } });
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async verifyPassword(id: number, password: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    const targetUser = await this.findOne(id);
    if (!targetUser) {
      throw new BadRequestException('User not found');
    }
    return await verifyPassword(password, targetUser.password);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const data: any = {};
    if (updateUserDto.email) data.email = updateUserDto.email;
    if (updateUserDto.password)
      data.password = await hashPassword(updateUserDto.password);

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
      },
    });
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const targetUser = await this.findOne(id);
    if (!targetUser) {
      throw new BadRequestException(`User with ID ${id} doesnt exist`);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
