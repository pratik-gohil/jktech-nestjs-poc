import { Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { Observable } from 'rxjs';

@Controller('ingestion')
export class IngestionController {
 constructor(private readonly ingestionService: IngestionService) { }

 @Post()
 addIngestion(): Observable<string> {
  return this.ingestionService.addIngestion();
 }
}
