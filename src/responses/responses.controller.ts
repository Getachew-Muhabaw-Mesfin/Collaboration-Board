import {
  Controller,
  Post as PostMethod,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Get,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  // Create a response for a post
  @PostMethod()
  async create(
    @Body() createResponseDto: CreateResponseDto,
    @Body('userId') userId: number,
  ) {
    return this.responsesService.create(createResponseDto, userId);
  }

  // Get responses for a given post
  @Get(':postId')
  async getResponsesForPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.responsesService.getResponsesForPost(postId, paginationDto);
  }
}
