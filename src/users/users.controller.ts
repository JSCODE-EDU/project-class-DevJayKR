import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AtGuard } from 'src/auth/guard/at.guard';
import { GetUser } from 'src/common/GetUser.decorator';
import { User } from './entity/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '프로필 조회',
    description: 'Bearer 토큰 인증 후 유저 정보를 객체 형태로 반환합니다.',
  })
  async profile(@GetUser() user: User): Promise<User> {
    return user;
  }
}
