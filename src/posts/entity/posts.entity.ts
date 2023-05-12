import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @Column()
  @ApiProperty({ example: '제목 예시', description: '제목' })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: '내용 예시', description: '내용' })
  detail: string;
}
