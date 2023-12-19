import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto, LoginAuthDto } from './dto';
@Injectable({})
export class AuthService {

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signin(userDTO: LoginAuthDto) {
    try {
      const userLogin = await this.prisma.travelers.findFirst({
        where: {
          document: userDTO.document
        },
        select: {
          id: true,
          name: true,
          document: true
        },
      });
      if (!userLogin) {
        throw new ForbiddenException('El usuario no existe.');
      }
      return this.signToken(userLogin.id, userLogin.document);
    } catch (err) {
      return err;
    }
  }
  
  async signup(travelerDTO: CreateAuthDto) {
    try {

      const traveler = await this.prisma.travelers.create({
        data: {
          name: travelerDTO.name,
          document: travelerDTO.document,
          date_of_birth: travelerDTO.date_of_birth,
          phone: travelerDTO.phone
        },
        select: {
          id: true,
          name: true,
        },
      });

      return this.signToken(traveler.id, traveler.name);
    } catch (err) {
      return err;
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });
    return {
      access_token,
    };
  }

}
