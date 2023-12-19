import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiBody } from '@nestjs/swagger';

import { CreateAuthDto, LoginAuthDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('Travelers Auth Controller: For Future Implementation')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateAuthDto })
  signup(@Body() user: CreateAuthDto) {
    return this.authService.signup(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() user: LoginAuthDto) {
    return this.authService.signin(user);
  }
}
