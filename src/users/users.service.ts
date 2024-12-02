import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(userDto: any): Promise<User> {
    const { password, ...rest } = userDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    return savedUser instanceof Array ? savedUser[0] : savedUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (error: any) {
      return error instanceof Error ? undefined : error;
    }
  }
}
