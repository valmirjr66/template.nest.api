import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Template NestJS API')
    .setDescription('This is an RESTful API template based on NestJS')
    .setVersion('1.0')
    .addTag('texts')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('ui', app, document);

  await app.listen(3000);
}

bootstrap();
