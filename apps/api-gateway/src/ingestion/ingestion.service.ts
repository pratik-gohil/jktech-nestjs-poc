import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class IngestionService {
 constructor(@Inject('INGESION_SERVICE') private redisClient: ClientProxy) { }

 addIngestion(): Observable<string> {
  return this.redisClient.send('add.ingestion', {});
 }
}
