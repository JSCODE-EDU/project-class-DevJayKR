import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

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
}
