import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewTravelerDTO {
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ type: 'array', items: { type: 'string' }, default: [] })
  @IsArray()
  trips: string[];
}

export class EditTravelerDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  document: string;
  @ApiProperty()
  @IsString()
  date_of_birth: Date;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty({ type: 'array', items: { type: 'string' }, default: [] })
  @IsArray()
  trips: string[];
}

export class GetTravelerDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idDocument: string;
}
