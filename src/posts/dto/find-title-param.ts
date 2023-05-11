import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class FindTitleParam {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  title: string;
}
