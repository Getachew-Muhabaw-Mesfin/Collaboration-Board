import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  /**
   * TYPEORM CONFIGURATION WITH CONFIG MODULE
   *
   */

  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Post, Response, Notification, User]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
