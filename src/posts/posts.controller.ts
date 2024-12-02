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

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.postsService.create(createPostDto, userId);
  }

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

  // Delete a post
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Request() req: any) {
    const userId = req.user.userId;
    return this.postsService.delete(id, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPosts(@Query() paginationDto: PaginationDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.postsService.getPosts(paginationDto, userId);
  }
}
