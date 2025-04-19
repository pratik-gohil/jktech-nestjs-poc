import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
  addIngestion(): string {
    return 'Processing';
  }
}
