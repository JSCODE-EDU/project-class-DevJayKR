import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entity/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAllPost(): Promise<Posts[]> {
    return await this.postsService.findAllPost();
  }

  @Get(':id')
  async findOnePostById(@Param('id') id: number): Promise<Posts> {
    return await this.postsService.findOnePostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<Posts> {
    return await this.postsService.createPost(dto);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto): Promise<Posts> {
    return await this.postsService.updatePost(id, dto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<Posts> {
    return await this.postsService.deletePost(id);
  }

  @Get('/search/:title')
  async searchTitle(@Param('title') title: string): Promise<Posts[]> {
    return await this.postsService.searchTitle(title);
  }
}
