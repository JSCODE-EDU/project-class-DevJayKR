import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @IsNotEmpty()
  detail: string;
}
