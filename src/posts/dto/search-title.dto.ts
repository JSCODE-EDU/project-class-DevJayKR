import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchTitleDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  title: string;
}
