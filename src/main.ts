import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1.0');
  await app.listen(3000);
  console.log(
    '----------------Server is running on http://localhost:3000 ---------------',
  );
}
bootstrap();
