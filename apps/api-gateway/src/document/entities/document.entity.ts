// src/documents/entities/document.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'generated/prisma';
import { Exclude } from 'class-transformer';

export class DocumentEntity implements Partial<Document> {
 constructor(partial: Partial<DocumentEntity>) {
  Object.assign(this, partial);
 }

 @ApiProperty()
 id: string;

 @ApiProperty()
 createdAt: Date;

 @ApiProperty()
 updatedAt: Date;

 @ApiProperty()
 name: string;

 @ApiProperty()
 path: string;

 @ApiProperty()
 mimeType: string;

 @ApiProperty()
 uploadedBy: string;

 @Exclude()
 deletedAt?: Date | null;
}
