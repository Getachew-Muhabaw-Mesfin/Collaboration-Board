import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  /**
   * CREATE A CATEGORY
   *
   * INJECT CATEGORIES SERVICE
   */

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  /**
   * UPDATE A CATEGORY
   *
   * INJECT CATEGORIES SERVICE
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  /**
   * DELETE A CATEGORY
   *
   * INJECT CATEGORIES SERVICE
   */
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }

  /**
   * GET ALL CATEGORIES
   *
   * INJECT CATEGORIES SERVICE
   */
  @Get()
  async getCategories(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.getCategories(paginationDto);
  }

  /**
   * GET A CATEGORY BY ID
   *
   * INJECT CATEGORIES SERVICE
   */

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryById(id);
  }
}
