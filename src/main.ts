import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

dotenv.config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares and Pipes
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('/api'); // Sets the base path for all routes

  await app.listen(3000);
}

bootstrap();
