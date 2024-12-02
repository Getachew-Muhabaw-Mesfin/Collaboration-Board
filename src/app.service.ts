import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * API HEALTHCHECK
   * IT RETURNS A MESSAGE TO CONFIRM THAT THE API IS UP AND RUNNING
   */
  healthcheck(): { message: string; status: number } {
    return { status: 200, message: 'API is up and running 🚀' };
  }
}
