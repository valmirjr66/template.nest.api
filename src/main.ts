import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import mainDataSource from 'repository/MainDataSource';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api').useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Template NestJS API')
    .setDescription('This is an RESTful API template based on NestJS')
    .setVersion('1.0')
    .addTag('Text')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerDarkTheme = new SwaggerTheme().getBuffer(
    SwaggerThemeNameEnum.DARK,
  );

  SwaggerModule.setup('ui', app, document, {
    customCss: swaggerDarkTheme,
  });

  mainDataSource.initialize();

  const PORT = 4000;

  await app.listen(PORT);

  Logger.log(`Application is running at port ${PORT}`);
}

bootstrap();
