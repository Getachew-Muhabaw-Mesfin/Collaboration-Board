import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigModule } from '@nestjs/config';
// import { PostsModule } from 'src/posts/posts.module';
// import { UsersModule } from 'src/users/users.module';
// import { ResponsesModule } from 'src/responses/responses.module';
// import { CategoriesModule } from '../categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
