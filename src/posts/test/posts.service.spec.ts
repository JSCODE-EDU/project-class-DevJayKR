import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Posts } from '../entity/posts.entity';

describe('PostsService', () => {
  let postsService: PostsService;
  let mockDatabase = [];
  const createNewPost = new Posts(1, 'test', 'test', new Date());

  // Repository 모킹
  const MockRepository = {
    find: jest.fn().mockResolvedValue([createNewPost]),
    findOneBy: jest.fn((id) => {
      return mockDatabase.find((post) => post.id === id);
    }),
    create: jest.fn((x) => x),
    save: jest.fn((post) => mockDatabase.push(post)),
    exist: jest.fn((id) =>
      mockDatabase.find((post) => {
        if (post.id === id) return true;
        else return false;
      }),
    ),
  };

  beforeEach(async () => {
    mockDatabase = [];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Posts),
          useValue: MockRepository,
        },
      ],
    })
      .overrideProvider('PostsService')
      .useValue({
        findOnePostById: jest.fn().mockRejectedValueOnce(true),
      })
      .compile();

    postsService = module.get<PostsService>(PostsService);
  });

  it('postsService는 정의되어 있어야 함', () => {
    expect(postsService).toBeDefined();
  });

  describe('createPost', () => {
    it('게시글을 생성하고 반환해야 함', async () => {
      const post = await postsService.createPost(createNewPost);

      expect(post).toMatchObject<Posts>(post);
    });

    it('게시글은 저장되어야 함', async () => {
      const post = await postsService.createPost(createNewPost);

      expect(mockDatabase[0]).toMatchObject<Posts>(post);
    });
  });

  describe('findAllPost', () => {
    it('모든 게시글은 배열 형태로 반환되어야 함', async () => {
      const posts = await postsService.findAllPost();

      expect(posts).toEqual([createNewPost]);
    });
  });

  describe('findOnePostById', () => {
    it('해당하는 id를 가진 게시글이 반환되어야 함', async () => {
      // 질문
      // 아래 함수 내부엔 isExist 함수가 있음
      // isExist 함수는 엔티티 존재 여부를 판별하고 존재하지 않으면 에러를 던짐
      // 문제는 overrideProvider를 해봐도 isExist 함수가 에러를 던지기 때문에 테스트 진행이 안됨.
      const post = await postsService.findOnePostById(1);
    });
  });
});
