import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * REGISTER A USER
   * INJECT USER SERVICE
   */
  @Post('register')
  async register(@Body() createUserDto: any) {
    return this.userService.register(createUserDto);
  }

  /**
   * LOGIN A USER
   * INJECT AUTH SERVICE
   */
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  /**
   * GET USER PROFILE
   * INJECT JWT GUARD
   */
  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
