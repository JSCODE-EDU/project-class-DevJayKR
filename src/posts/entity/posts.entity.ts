import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @Column()
  @ApiProperty({ example: '제목 예시', description: '제목' })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: '내용 예시', description: '내용' })
  detail: string;

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
