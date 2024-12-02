import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  //  config module , PostModule, and NotificationModule, and ResponseModule
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Post, Response, Notification, User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
