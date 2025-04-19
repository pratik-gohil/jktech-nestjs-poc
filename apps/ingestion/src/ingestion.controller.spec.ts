import { Test, TestingModule } from '@nestjs/testing';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';

describe('IngestionController', () => {
  let ingestionController: IngestionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [IngestionService],
    }).compile();

    ingestionController = app.get<IngestionController>(IngestionController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(ingestionController).toBeDefined();
    });
  });
});
