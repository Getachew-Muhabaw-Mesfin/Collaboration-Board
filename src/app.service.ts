import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthcheck(): { message: string; status: number } {
    return { status: 200, message: 'API is up and running 🚀' };
  }
}
