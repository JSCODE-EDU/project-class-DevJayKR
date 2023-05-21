import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

type FindUserOptions = { id?: number; email?: string };

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async isExistUser(findUserOptions: FindUserOptions): Promise<boolean> {
    return await this.usersRepository.exist({ where: findUserOptions });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const { email } = dto;

    const isExistUser = await this.isExistUser({ email });
    if (isExistUser) throw new UnprocessableEntityException('이미 존재하는 이메일입니다.');

    const newUser = this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async findOneUser(findUserOptions: FindUserOptions): Promise<User | null> {
    return await this.usersRepository.findOneBy(findUserOptions);
  }
}
