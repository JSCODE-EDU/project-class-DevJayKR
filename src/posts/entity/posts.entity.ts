import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  detail: string;
}
