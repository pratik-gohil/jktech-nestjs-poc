import { NestFactory } from '@nestjs/core';
import { IngestionModule } from './ingestion.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(IngestionModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.listen();
}
bootstrap();
