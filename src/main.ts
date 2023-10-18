import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = Object.values(errors[0].constraints!)[0];

        throw new BadRequestException(messages);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
