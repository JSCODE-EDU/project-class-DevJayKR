import { Injectable } from '@nestjs/common';
import { Posts } from './entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async createPost(dto: CreatePostDto): Promise<Posts> {
    const newPost = this.postRepository.create(dto);
    await this.postRepository.save(newPost);

    return newPost;
  }

  async findAllPost(): Promise<Posts[]> {
    return await this.postRepository.find({ take: 100, order: { createdAt: 'desc' } });
  }

  async findOnePostById(id: number): Promise<Posts> {
    return await this.postRepository.findOneBy({ id });
  }

  async updatePost(id: number, dto: UpdatePostDto): Promise<Posts> {
    const { title, detail } = dto;

    await this.postRepository.update(id, {
      title,
      detail,
    });

    return await this.findOnePostById(id);
  }

  async deletePost(id: number): Promise<Posts> {
    const post = await this.findOnePostById(id);

    await this.postRepository.softDelete(id);

    return post;
  }

  async searchTitle(title: string): Promise<Posts[]> {
    const posts = await this.postRepository.find({
      where: { title: Like(`%${title}%`) },
      order: { createdAt: 'desc' },
      take: 100,
    });

    return posts;
  }
}
