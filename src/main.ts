import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // versioning => default for all controllers 'v1'
  // enable versioning must be called before swagger config
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // swagger config

  const config = new DocumentBuilder()
    .setTitle('Orders Api')
    .setDescription('REST api for Orders project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // cors config

  const ORIGIN = process.env.ORIGIN || '*';
  app.enableCors({ origin: ORIGIN });

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
}
bootstrap();
