import { Controller, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) { }

  @MessagePattern('add.ingestion')
  async addIngestion(): Promise<string> {
    return this.ingestionService.addIngestion();
  }
}
