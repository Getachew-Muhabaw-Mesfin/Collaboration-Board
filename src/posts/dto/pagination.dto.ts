import { IsOptional, IsInt, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  title?: string;
  @IsOptional()
  categoryName?: string;
}
