import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './../posts.controller';
import { PostsService } from './../posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Posts } from '../entity/posts.entity';
import { Repository } from 'typeorm';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Posts),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('컨트롤러는 정의 되어 있어야 함', () => {
    expect(controller).toBeDefined();
  });
});
