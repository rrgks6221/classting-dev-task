import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENV_KEY } from 'src/config/app-config/app-config.constant';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get<AppConfigService>(AppConfigService);

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

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const isProduction = appConfigService.isProduction();

  if (!isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('classting dev task')
      .setDescription('classting dev task')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api-docs', app, document);
  }

  const PORT = appConfigService.get<number>(ENV_KEY.PORT);

  await app.listen(PORT);

  console.info(`server listening on port ${PORT}`);
}
bootstrap();
