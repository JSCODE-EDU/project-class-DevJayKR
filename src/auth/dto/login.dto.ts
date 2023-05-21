import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength, NotContains } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @MinLength(8)
  @MaxLength(15)
  @IsNotEmpty()
  @NotContains(' ', { message: '$property에 공백은 사용할 수 없습니다.' })
  @ApiProperty({ example: 'string' })
  password: string;
}
