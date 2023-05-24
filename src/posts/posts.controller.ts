import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entity/posts.entity';
import { SearchTitleDto } from './dto/search-title.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guard/at.guard';
import { GetUser } from 'src/common/GetUser.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('posts')
@ApiTags('Posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary: '모든 게시글 조회',
    description: '모든 게시글을 생성일 기준 내림차순으로 정렬하여 배열 형태로 반환합니다.',
  })
  async findAllPost(): Promise<Posts[]> {
    return await this.postsService.findAllPost();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 조회',
    description: '해당하는 ID값을 가진 게시글을 댓글과 좋아요를 포함한 상태의 객체 형태로 반환합니다.',
  })
  @ApiOkResponse({
    schema: {
      example: {
        id: 1,
        title: '제목 예시',
        detail: '내용 예시',
        createdAt: '2023-05-24T16:11:51.882Z',
        updatedAt: '2023-05-24T16:11:51.882Z',
        deletedAt: null,
        author: {
          email: 'example@example.com',
        },
        comments: [
          {
            createdAt: '2023-05-24T16:37:09.476Z',
            comment: '댓글 예시',
            user: {
              email: 'example@example.com',
            },
          },
        ],
        likes: [
          {
            createdAt: '2023-05-24T19:00:18.386Z',
            user: {
              email: 'example@example.com',
            },
          },
        ],
      },
    },
  })
  async findOnePostById(@Param('id') id: number): Promise<Posts> {
    return await this.postsService.findOnePostById(id);
  }

  @Post(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '좋아요', description: '해당하는 ID값을 가진 게시글에 좋아요를 추가/삭제 합니다.' })
  @ApiCreatedResponse({
    schema: {
      example: { message: '좋아요 성공' },
    },
  })
  @UseGuards(AtGuard)
  async like(@GetUser() user: User, @Param('id') id: number) {
    return await this.postsService.likePost(user, id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: '게시글 생성', description: '새로운 게시글을 생성하고, 생성된 게시글을 객체 형태로 반환합니다.' })
  @ApiCreatedResponse({
    schema: {
      example: {
        id: 1,
        title: 'string',
        detail: 'string',
        createdAt: '2023-05-24T19:03:39.740Z',
        updatedAt: '2023-05-24T19:03:39.740Z',
        deletedAt: null,
      },
    },
  })
  async createPost(@Body() dto: CreatePostDto, @GetUser() user: User): Promise<Posts> {
    return await this.postsService.createPost(dto, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: '게시글 수정', description: '해당하는 ID값의 게시글을 수정하고, 수정된 게시글을 객체 형태로 반환합니다.' })
  async updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto, @GetUser() user: User): Promise<Posts> {
    return await this.postsService.updatePost(id, dto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: '게시글 삭제', description: '해당하는 ID값의 게시글을 삭제하고, 삭제 전 게시글을 객체 형태로 반환합니다.' })
  async deletePost(@Param('id') id: number, @GetUser() user: User): Promise<Posts> {
    return await this.postsService.deletePost(id, user);
  }

  @Get('/search/:title')
  @ApiOperation({
    summary: '제목으로 게시글 검색',
    description: '제목이 포함된 모든 게시글을 생성일 기준 내림차순으로 정렬하여 배열 형태로 반환합니다.',
  })
  async searchTitle(@Param() param: SearchTitleDto): Promise<Posts[]> {
    return await this.postsService.searchTitle(param.title);
  }
}
