import { Controller, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { MessagePattern } from '@nestjs/microservices';
import { IngestionEntity } from './entity/ingestion.entity';

@Controller()
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) { }

  @MessagePattern('add.ingestion')
  async addIngestion(documentId: string): Promise<IngestionEntity> {
    try {
      const ingestion = await this.ingestionService.addIngestion(documentId);

      return ingestion;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern('get.ingestion')
  async getIngestion(ingestionId: string): Promise<IngestionEntity> {
    return this.ingestionService.getIngestion(ingestionId);
  }
}
