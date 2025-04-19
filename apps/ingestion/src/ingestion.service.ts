import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'apps/api-gateway/src/prisma/prisma.service';
import { IngestionEntity } from './entity/ingestion.entity';

@Injectable()
export class IngestionService {
  constructor(private prisma: PrismaService) { }

  async addIngestion(documentId: string): Promise<IngestionEntity> {
    const existing = await this.prisma.ingestion.findUnique({ where: { documentId } });
    if (existing) throw new UnprocessableEntityException("ingestion already exists");

    const ingestion = await this.prisma.ingestion.create({
      data: {
        documentId,
        status: "PROCESSING",
      }
    });

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
