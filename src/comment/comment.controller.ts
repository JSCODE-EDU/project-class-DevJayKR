import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AtGuard } from 'src/auth/guard/at.guard';
import { GetUser } from 'src/common/GetUser.decorator';
import { User } from 'src/users/entity/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  @ApiOkResponse({
    schema: {
      example: {
        id: 1,
        title: '제목 예시',
        detail: '내용 예시',
        createdAt: '2023-05-23T01:52:04.687Z',
        updatedAt: '2023-05-23T01:52:04.687Z',
        deletedAt: null,
        comments: [
          {
            id: 1,
            createdAt: '2023-05-23T01:37:20.088Z',
            updatedAt: '2023-05-23T01:37:20.088Z',
            deletedAt: null,
            comment: '코멘트 예시',
          },
        ],
      },
    },
  })
  @ApiOperation({
    summary: '게시물 아이디 기준 모든 댓글 조회',
    description: '해당 게시물의 모든 댓글을 조회하여 객체 형태로 반환 합니다.',
  })
  async findAll(@Param('postId') postId: number) {
    return await this.commentService.findAllCommentsByPostId(postId);
  }

  @Post(':postId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    schema: {
      example: {
        id: 1,
        title: '제목 예시',
        detail: '내용 예시',
        createdAt: '2023-05-23T01:52:04.687Z',
        updatedAt: '2023-05-23T01:52:04.687Z',
        deletedAt: null,
        comments: [
          {
            id: 1,
            createdAt: '2023-05-23T01:54:57.463Z',
            updatedAt: '2023-05-23T01:54:57.463Z',
            deletedAt: null,
            comment: '코멘트 예시',
          },
        ],
      },
    },
  })
  @ApiOperation({
    summary: '댓글 생성',
    description: '게시물에 댓글을 생성하고 객체 형태로 반환 합니다.',
  })
  @UseGuards(AtGuard)
  async create(@Param('postId') postId: number, @GetUser() user: User, @Body() dto: CreateCommentDto) {
    return await this.commentService.create(postId, user, dto);
  }
}
