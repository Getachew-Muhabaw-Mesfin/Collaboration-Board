import { IsOptional, IsInt, Min } from 'class-validator';

/**
 * PAGINATION DTO FOR PAGINATION OF RESPONSES
 * IN RESPONSES MODULE
 */
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;
}
