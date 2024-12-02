import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Response } from '../../responses/entities/response.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Exclude } from 'class-transformer';

/**
 * User entity
 * This entity is used to create a user table in the database with relations to other tables
 */
@Entity()
@Index('IDX_USER_EMAIL', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Response, (response) => response.user)
  responses: Response[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
