import { IsNotEmpty, IsString, IsInt } from 'class-validator';

/**
 * CREATE RESPONSE DTO FOR CREATING RESPONSES
 * IN RESPONSES MODULE
 */
export class CreateResponseDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  postId: number;
}
