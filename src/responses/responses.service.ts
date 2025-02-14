import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { Post } from '../posts/entities/post.entity';
import { PaginationDto } from './dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';
import { classToPlain } from 'class-transformer';

/**
 * RESPONSES SERVICE
 *
 */
@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * ANSWER FOR A POST BY A USER
   *INJECT POSTS REPOSITORY
   */
  async create(
    createResponseDto: CreateResponseDto,
    userId: number,
  ): Promise<Response> {
    const post = await this.postsRepository.findOne({
      where: { id: createResponseDto.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response = this.responsesRepository.create({
      content: createResponseDto.content,
      post,
      user: classToPlain(user),
    });

    return await this.responsesRepository.save(response);
  }

  /**
   * GET RESPONSES FOR A POST
   * INJECT POSTS REPOSITORY
   */
  async getResponsesForPost(
    postId: number,
    paginationDto: PaginationDto,
  ): Promise<Response[]> {
    const { page, limit } = paginationDto;

    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.responsesRepository.find({
      where: { post: { id: postId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }
}
