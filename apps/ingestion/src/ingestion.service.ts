import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'apps/api-gateway/src/prisma/prisma.service';
import { IngestionEntity } from './entity/ingestion.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class IngestionService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('ingestion') private ingestionQueue: Queue
  ) { }

  async addIngestion(documentId: string): Promise<IngestionEntity> {
    const existing = await this.prisma.ingestion.findUnique({ where: { documentId } });
    if (existing) throw new UnprocessableEntityException("ingestion already exists");

    const ingestion = await this.prisma.ingestion.create({
      data: {
        documentId,
        status: "PROCESSING",
      }
    });

    await this.ingestionQueue.add('process-document', { documentId });

    return ingestion;
  }

  async getIngestion(ingestionId: string): Promise<IngestionEntity> {
    return await this.prisma.ingestion.findUnique({
      where: {
        id: ingestionId
      }
    })
  }
}
