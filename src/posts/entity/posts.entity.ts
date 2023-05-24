import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Comment } from 'src/comment/entity/comment.entity';

@Entity()
export class Posts extends BaseEntity {
  @Column()
  @ApiProperty({ example: '제목 예시', description: '제목' })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: '내용 예시', description: '내용' })
  detail: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ApiHideProperty()
  @OneToMany(() => Comment, (comment) => comment.post, {})
  comments: Comment[];

  constructor(id: number, title: string, detail: string, createdAt: Date) {
    super();
    this.id = id;
    this.title = title;
    this.detail = detail;
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
    this.deletedAt = null;
  }
}
