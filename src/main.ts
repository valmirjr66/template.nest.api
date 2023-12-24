import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Template NestJS API')
    .setDescription('This is an RESTful API template based on NestJS')
    .setVersion('1.0')
    .addTag('Text')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('ui', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
