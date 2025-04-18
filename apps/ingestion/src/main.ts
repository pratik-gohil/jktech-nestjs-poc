import { NestFactory } from '@nestjs/core';
import { IngestionModule } from './ingestion.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(IngestionModule);

  const config = new DocumentBuilder()
    .setTitle('Ingestion Service')
    .setDescription('Nestjs POC - Ingestion Service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
