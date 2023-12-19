import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  document: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date_of_birth: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
  @ApiProperty({ type: 'array', items: { type: 'string' }, default: [] })
  travelers: string[];
}

export class LoginAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  document: string;
}