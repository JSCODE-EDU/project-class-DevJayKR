import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Posts } from './entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Like, Relation, RelationOptions, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async isExist(id: number) {
    const post = await this.postRepository.exist({ where: { id } });

    if (post) return post;
    throw new NotFoundException('존재하지 않는 게시글입니다.');
  }

  async createPost(dto: CreatePostDto, user: User): Promise<Posts> {
    const { title, detail } = dto;

    const newPost = this.postRepository.create({
      title,
      detail,
      author: user,
    });

    await this.postRepository.save(newPost);

    return newPost;
  }

  async isOwnedPost(postId: number, userId: number): Promise<boolean> {
    const post = await this.findOnePostByIdWithRelations(postId, {
      author: true,
    });

    if (post.author.id === userId) return true;
    throw new UnauthorizedException('해당 게시글에 관한 권한이 없습니다.');
  }

  async findAllPost(): Promise<Posts[]> {
    return await this.postRepository.find({ take: 100, order: { createdAt: 'desc' } });
  }

  async findOnePostById(id: number): Promise<Posts> {
    await this.isExist(id);

    const post = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoin('posts.author', 'a')
      .leftJoin('posts.comments', 'c')
      .innerJoin('c.user', 'cu')
      .select([
        'posts.id',
        'posts.title',
        'posts.detail',
        'posts.createdAt',
        'posts.updatedAt',
        'posts.deletedAt',
        'a.id',
        'a.email',
        'c.createdAt',
        'c.comment',
        'cu.id',
        'cu.email',
      ])
      .where('posts.id = :id', { id })
      .getOne();

    return post;
  }

  async findOnePostByIdWithRelations(id: number, relationOptions: FindOptionsRelations<Posts>): Promise<Posts> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
      relations: relationOptions,
    });
  }

  async updatePost(id: number, dto: UpdatePostDto, user: User): Promise<Posts> {
    await this.isExist(id);
    await this.isOwnedPost(id, user.id);

    const { title, detail } = dto;

    await this.postRepository.update(id, {
      title,
      detail,
    });

    return await this.findOnePostById(id);
  }

  async deletePost(id: number, user: User): Promise<Posts> {
    await this.isExist(id);
    await this.isOwnedPost(id, user.id);

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
