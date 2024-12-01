import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Response } from '../../responses/entities/response.entity';

/**
 * Post Entity
 * This entity represents a post with relation to the user who created the post and the category to which the post belongs.
 */
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @OneToMany(() => Response, (response) => response.post)
  responses: Response[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
