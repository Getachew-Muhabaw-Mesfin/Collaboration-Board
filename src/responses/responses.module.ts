import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { Response } from './entities/response.entity';
import { Post } from '../posts/entities/post.entity';
import { PostsModule } from '../posts/posts.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response, Post, User]),
    forwardRef(() => PostsModule),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
