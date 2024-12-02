import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * CORES AND GLOBAL PREFIX
   * Enable CORS and set a global prefix for all routes
   */
  app.enableCors();
  app.setGlobalPrefix('api/v1.0');
  await app.listen(3000);
  console.log(
    '----------------Server is running on http://localhost:3000 ---------------',
  );
}
bootstrap();
