import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Response } from 'src/responses/entities/response.entity';
import { Post } from './entities/post.entity';
import { ResponsesModule } from 'src/responses/responses.module';

/**
 * POSTS MODULE
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Category, Response, Post]),
    forwardRef(() => ResponsesModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
