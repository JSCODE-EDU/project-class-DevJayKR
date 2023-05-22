import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtService as Jwt } from '@nestjs/jwt';
import { Payload } from './payload';

@Injectable()
export class JwtService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private jwt: Jwt,
  ) {}

  generateAccessToken(payload: Payload) {
    return this.jwt.sign(payload, {
      privateKey: this.config.access.key,
      expiresIn: this.config.access.expireTime,
    });
  }
}
