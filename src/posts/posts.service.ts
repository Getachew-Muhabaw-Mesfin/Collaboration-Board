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
    const { page, limit, categoryName, title } = paginationDto;

    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { user: { id: userId } };

    if (categoryName) {
      where.category = { name: categoryName };
    }

    if (title) {
      where.title = title;
    }

    return this.postsRepository.find({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 10 : take,
      order: { createdAt: 'DESC' },
      where,
      relations: ['category'],
    });
  }
}
