import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'apps/api-gateway/src/prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { IngestionProcessor } from './ingestion.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'ingestion',
    }),
  ],
  controllers: [IngestionController],
  providers: [IngestionService, PrismaService, IngestionProcessor],
})
export class IngestionModule { }
