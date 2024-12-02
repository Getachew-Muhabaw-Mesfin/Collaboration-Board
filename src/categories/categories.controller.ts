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

  // Create a new category
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Update an existing category
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // Delete a category
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }

  // Get categories with pagination
  @Get()
  async getCategories(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.getCategories(paginationDto);
  }

  // Get a single category by ID
  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryById(id);
  }
}
