import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { Payload } from 'src/jwt/payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.access.key,
    });
  }

  async validate(payload: Payload) {
    return await this.usersService.findOneUser({ id: payload.id });
  }
}
