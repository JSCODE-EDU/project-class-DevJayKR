import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('at') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    const error = info?.message;

    if (error === 'No auth token') throw new BadRequestException('토큰이 없습니다.');
    if (error === 'invalid token') throw new BadRequestException('잘못된 형식의 토큰입니다.');
    if (error === 'jwt expired') throw new UnauthorizedException('유효 시간이 만료된 토큰 입니다.');

    return super.handleRequest(err, user, info, context, status);
  }
}
