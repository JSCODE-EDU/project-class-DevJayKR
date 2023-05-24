import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ example: 1, description: 'Primary Key' })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '수정일' })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  @ApiProperty({ example: null })
  @ApiProperty({ description: '삭제일' })
  deletedAt: Date | null;
}
