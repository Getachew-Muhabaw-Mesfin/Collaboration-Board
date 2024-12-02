import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Category } from '../categories/entities/category.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const category = await this.categoryRepository.findOneBy({
      id: createPostDto.categoryId,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      user: classToPlain(user),
      category,
    });

    return this.postsRepository.save(post);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    Object.assign(post, updatePostDto);

    return this.postsRepository.save(post);
  }

  async delete(id: number, userId: number): Promise<void> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }

    await this.postsRepository.remove(post);
  }

  async getPosts(
    paginationDto: PaginationDto,
    userId: number,
  ): Promise<Post[]> {
    const { page, limit, categoryId, categoryName, title } = paginationDto;

    // Ensure that skip and limit are numbers
    const skip = (page - 1) * limit;
    const take = limit;

    // Build the where condition dynamically based on the inputs
    const where: any = { user: { id: userId } };

    // Optionally, add category filter if categoryId or categoryName is provided
    if (categoryId) {
      where.category = { id: categoryId };
    }
    if (categoryName) {
      where.category = { name: categoryName }; // Assuming 'name' is the category name field
    }

    // Optionally, add title filter if provided
    if (title) {
      where.title = title;
    }

    // Fetch the posts with pagination and apply filters
    return this.postsRepository.find({
      skip: isNaN(skip) ? 0 : skip, // Default to 0 if skip is not a number
      take: isNaN(take) ? 10 : take, // Default to 10 if take is not a number
      order: { createdAt: 'DESC' },
      where, // Apply the dynamic where condition
      relations: ['category'], // Include category relation to filter by category name
    });
  }
}
