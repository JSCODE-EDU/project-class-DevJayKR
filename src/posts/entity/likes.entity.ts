import { BaseEntity } from 'src/common/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Posts } from 'src/posts/entity/posts.entity';

@Entity()
export class Likes extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Posts, (post) => post.likes)
  post: Posts;
}
