import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signUp(dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findOneUser({ email });

    if (user) {
      if (user.password === password) {
        return this.jwtService.generateAccessToken({ id: user.id, email: user.email });
      }

      throw new UnauthorizedException('패스워드가 일치하지 않습니다.');
    }

    throw new BadRequestException('존재하지 않는 이메일입니다.');
  }
}
