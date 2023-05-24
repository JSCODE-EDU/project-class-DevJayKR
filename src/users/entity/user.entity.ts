import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { Posts } from 'src/posts/entity/posts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({
    example: 'example@example.com',
  })
  email: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password: string;

  @ApiHideProperty()
  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];

  @ApiHideProperty()
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
