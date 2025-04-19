import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Ingestion, Status } from 'generated/prisma';

export class IngestionEntity implements Partial<Ingestion> {
 constructor(partial: Partial<IngestionEntity>) {
  Object.assign(this, partial);
 }

 @ApiProperty()
 id: string;

 @IsUUID()
 @ApiProperty()
 documentId: string;

 @ApiProperty()
 status: Status;

 @ApiProperty()
 createdAt: Date;

 @ApiProperty()
 updatedAt: Date;
}
