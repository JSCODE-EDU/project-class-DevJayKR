import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Posts } from './entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entity/user.entity';
import { Likes } from './entity/likes.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    @InjectRepository(Likes)
    private likesRepository: Repository<Likes>,
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
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('likes.user', 'likes_user')
      .leftJoinAndSelect('comments.user', 'comments_user')
      .orderBy('comments.createdAt', 'ASC')
      .select([
        'post.id',
        'post.title',
        'post.detail',
        'post.createdAt',
        'post.updatedAt',
        'author.id AS authorEmail',
        'author.email',
        'comments.createdAt',
        'comments.comment',
        'comments_user.email',
        'likes.createdAt',
        'likes_user.email',
      ])
      //.addSelect('COUNT(likes)', 'likeCount')
      .where('post.id = :id', { id })
      .getOne();

    return post;
  }

  async likePost(user: User, id: number) {
    const like = await this.getLike(user, id);

    if (like) {
      await this.deleteLike(like.id);
      return {
        message: '좋아요 취소',
      };
    } else {
      const newLike = this.likesRepository.create({
        user: user,
        post: await this.findOnePostById(id),
      });

      await this.likesRepository.save(newLike);

      return {
        message: '좋아요 성공',
      };
    }
  }

  async getLike(user: User, id: number) {
    return await this.likesRepository.findOne({
      where: { user: { id: user.id }, post: { id } },
    });
  }

  async deleteLike(likeId: number) {
    await this.likesRepository.delete(likeId);
  }

  async findOnePostByIdWithRelations(id: number, relationOptions?: FindOptionsRelations<Posts>): Promise<Posts> {
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

    return await this.findOnePostByIdWithRelations(id);
  }

  async deletePost(id: number, user: User): Promise<Posts> {
    await this.isExist(id);
    await this.isOwnedPost(id, user.id);

    const post = await this.findOnePostByIdWithRelations(id);
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
