import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const frontendUrl = configService.get('FRONTEND_URL');

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(process.env.PORT);
}
bootstrap();
