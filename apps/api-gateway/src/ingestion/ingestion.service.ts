import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DocumentService } from '../document/document.service';
import { PrismaService } from '../prisma/prisma.service';
import { IngestionEntity } from './entity/ingestion.entity';

@Injectable()
export class IngestionService {
 constructor(
  @Inject('INGESION_SERVICE') private redisClient: ClientProxy,
  private readonly documentService: DocumentService,
  private readonly prismaService: PrismaService
 ) { }

 async addIngestion(documentId: string): Promise<Observable<IngestionEntity>> {
  const document = await this.documentService.findOne(documentId);
  if (!document) throw new UnprocessableEntityException("Document with ID " + documentId + " not found");

  const ingestion = await this.redisClient.send('add.ingestion', documentId);

  return ingestion;
 }

 async getIngestion(ingestionId: string): Promise<Observable<string>> {
  const document = await this.prismaService.ingestion.findUnique({ where: { id: ingestionId } })
  if (!document) throw new UnprocessableEntityException("Ingestion with ID " + ingestionId + " not found");

  return this.redisClient.send('get.ingestion', ingestionId);
 }
}
