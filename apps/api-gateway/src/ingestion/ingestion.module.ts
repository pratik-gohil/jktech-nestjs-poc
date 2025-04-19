import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DocumentModule } from '../document/document.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INGESION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
    DocumentModule
  ],
  providers: [IngestionService, PrismaService],
  controllers: [IngestionController]
})
export class IngestionModule { }
