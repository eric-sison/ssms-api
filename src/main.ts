import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://172.20.10.55:3000'],
  });

  app.use(helmet());

  app.enableVersioning({ type: VersioningType.URI });

  app.setGlobalPrefix('api');

  await app.listen(3005);
}
bootstrap();
