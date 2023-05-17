import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entity/posts.entity';
import { SearchTitleDto } from './dto/search-title.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({ summary: '게시글 조회', description: '해당하는 ID값을 가진 게시글을 객체 형태로 반환합니다.' })
  async findOnePostById(@Param('id') id: number): Promise<Posts> {
    return await this.postsService.findOnePostById(id);
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성', description: '새로운 게시글을 생성하고, 생성된 게시글을 객체 형태로 반환합니다.' })
  async createPost(@Body() dto: CreatePostDto): Promise<Posts> {
    return await this.postsService.createPost(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정', description: '해당하는 ID값의 게시글을 수정하고, 수정된 게시글을 객체 형태로 반환합니다.' })
  async updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto): Promise<Posts> {
    return await this.postsService.updatePost(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제', description: '해당하는 ID값의 게시글을 삭제하고, 삭제 전 게시글을 객체 형태로 반환합니다.' })
  async deletePost(@Param('id') id: number): Promise<Posts> {
    return await this.postsService.deletePost(id);
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
