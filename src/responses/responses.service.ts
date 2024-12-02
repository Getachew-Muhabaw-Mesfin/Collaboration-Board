import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { Post } from '../posts/entities/post.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  // Create a new response for a post
  async create(
    createResponseDto: CreateResponseDto,
    userId: number,
  ): Promise<Response> {
    const post = await this.postsRepository.findOneBy({
      id: createResponseDto.postId,
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const response = this.responsesRepository.create({
      content: createResponseDto.content,
      post,
      user: { id: userId } as any, // User reference
    });

    return this.responsesRepository.save(response);
  }

  // List all responses for a given post with pagination
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
