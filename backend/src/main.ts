import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { environments } from 'config/environments';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  await app.listen(environments.port || 3333);
}
bootstrap();
