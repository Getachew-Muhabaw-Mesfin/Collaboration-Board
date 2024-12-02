import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * CREATE A POST
   * INJECT POSTS SERVICE
   */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.postsService.create(createPostDto, userId);
  }

  /**
   * GET A POST BY ID
   * INJECT POSTS SERVICE
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.postsService.update(id, updatePostDto, userId);
  }

  /**
   * DELETE A POST BY ID
   * INJECT POSTS SERVICE
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Request() req: any) {
    const userId = req.user.userId;
    return this.postsService.delete(id, userId);
  }

  /**
   * GET POSTS
   * INJECT POSTS SERVICE
   * UTILIZE PAGINATION DTO TO HANDLE PAGINATION
   * UTILIZE REQUEST OBJECT TO GET USER ID
   * UTILIZE JWT GUARD TO PROTECT ROUTE
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPosts(@Query() paginationDto: PaginationDto, @Request() req: any) {
    const userId = req.user.userId;

    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const categoryId = paginationDto.categoryId;

    return this.postsService.getPosts({ page, limit, categoryId }, userId);
  }
}
