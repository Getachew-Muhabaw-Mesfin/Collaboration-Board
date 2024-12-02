import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ResponsesModule } from './responses/responses.module';
import { CategoriesModule } from './categories/categories.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /**
     * TYPEORM CONFIGURATION WITH CONFIG MODULE
     * MY SQL DATABASE CONNECTION AND LOADING ENVIRONMENT VARIABLES FROM .ENV FILE
     */
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
        logging: true,
        extra: {
          connectTimeout: 30000,
        },
      }),
    }),
    UsersModule,
    PostsModule,
    NotificationsModule,
    ResponsesModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
