import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Posts } from '../../posts/entity/posts.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column('text')
  comment: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Posts, (post) => post.comments)
  post: Posts;
}
