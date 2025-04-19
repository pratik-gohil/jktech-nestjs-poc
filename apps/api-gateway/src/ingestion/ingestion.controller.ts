import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { Observable } from 'rxjs';
import { CreateIngestionDto } from './dto/createingestion.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { RoleType } from 'generated/prisma';
import { IngestionEntity } from './entity/ingestion.entity';

@Controller('ingestion')
@ApiTags('ingestion')
@ApiBearerAuth()
export class IngestionController {
 constructor(private readonly ingestionService: IngestionService) { }

 @Post()
 @Roles(RoleType.ADMIN, RoleType.EDITOR)
 @ApiOkResponse({ type: IngestionEntity })
 async addIngestion(@Body() body: CreateIngestionDto): Promise<Observable<IngestionEntity>> {
  const ingestion = await this.ingestionService.addIngestion(body.documentId);

  return ingestion;
 }

 @Get("/:ingestionId")
 @Roles(RoleType.ADMIN, RoleType.EDITOR, RoleType.VIEWER)
 @ApiOkResponse({ type: IngestionEntity })
 async getIngestion(@Param('ingestionId', ParseUUIDPipe) ingestionId): Promise<Observable<string>> {
  return await this.ingestionService.getIngestion(ingestionId);
 }
}
