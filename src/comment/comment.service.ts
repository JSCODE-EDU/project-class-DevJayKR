import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async create(postId: number, user: User, dto: CreateCommentDto) {
    const newComment = this.commentRepository.create({
      post: await this.postsService.findOnePostById(postId),
      user: user,
      comment: dto.comment,
    });

    await this.commentRepository.save(newComment);

    return await this.findAllCommentsByPostId(postId);
  }

  async findAllCommentsByPostId(postId: number) {
    return await this.postsService.findOnePostByIdWithRelations(postId, {
      comments: true,
    });
  }
}
