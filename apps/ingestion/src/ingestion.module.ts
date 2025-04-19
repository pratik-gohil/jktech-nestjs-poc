import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'apps/api-gateway/src/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [IngestionController],
  providers: [IngestionService, PrismaService],
})
export class IngestionModule { }
