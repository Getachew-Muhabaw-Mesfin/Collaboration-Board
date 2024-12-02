import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
