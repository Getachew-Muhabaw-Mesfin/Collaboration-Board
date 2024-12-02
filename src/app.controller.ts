import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *
   * API HEALTHCHECK
   */
  @Get('healthcheck')
  getHello() {
    return this.appService.healthcheck();
  }
}
