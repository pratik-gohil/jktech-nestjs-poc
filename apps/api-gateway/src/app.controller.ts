import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  addIngestion(): Observable<string> {
    return this.appService.addIngestion();
  }
}
