import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  /**
   * CREATE A CATEGORY
   * INJECT CATEGORIES REPOSITORY
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findOneBy({
      name: createCategoryDto.name,
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  /**
   * UPDATE A CATEGORY
   * INJECT CATEGORIES REPOSITORY
   */
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  /**
   * DELETE A CATEGORY
   * INJECT CATEGORIES REPOSITORY
   */

  async delete(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoriesRepository.remove(category);
  }

  /**
   * GET CATEGORIES
   * INJECT CATEGORIES REPOSITORY
   * INJECT PAGINATION DTO
   */
  async getCategories(paginationDto?: PaginationDto): Promise<Category[]> {
    const page = paginationDto?.page ?? 1;
    const limit = paginationDto?.limit ?? 10;

    const pageNumber = parseInt(page.toString(), 10);
    const limitNumber = parseInt(limit.toString(), 10);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      throw new Error('Invalid pagination values');
    }

    return this.categoriesRepository.find({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * GET A CATEGORY BY ID
   * INJECT CATEGORIES REPOSITORY
   */
  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
