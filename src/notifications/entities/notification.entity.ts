import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsEnum } from 'class-validator';

@Entity()
@Index('IDX_NOTIFICATION_CREATED_AT', ['createdAt'])
@Index('IDX_NOTIFICATION_MESSAGE', ['message'])
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @IsEnum(['sms', 'email', 'inapp'])
  @Column({ type: 'varchar', length: 20, default: 'inapp', nullable: true })
  type: string;
  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
