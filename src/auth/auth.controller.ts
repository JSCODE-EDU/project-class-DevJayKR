import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입',
    description: '회원가입 된 유저 정보를 객체 형태로 반환 합니다.',
  })
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signUp(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: 'JWT 토큰을 문자열 형태로 반환합니다.',
  })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
