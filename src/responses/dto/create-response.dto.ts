import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  postId: number;
}
