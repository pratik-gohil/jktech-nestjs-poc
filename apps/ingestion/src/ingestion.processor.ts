import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/api-gateway/src/prisma/prisma.service';
import { Status } from 'generated/prisma';

@Processor('ingestion')
@Injectable()
export class IngestionProcessor {
 constructor(private readonly prismaService: PrismaService) { }

 @Process('process-document')
 async handleIngestion(job: Job<{ documentId: string }>) {
  const { documentId } = job.data;
  console.log(`[Worker] Processing document: ${documentId}`);

  await new Promise((res) => setTimeout(res, 3000));

  const status = Math.random() > 0.2 ? Status.COMPLETED : Status.FAILED;

  await this.prismaService.ingestion.update({
   where: { documentId },
   data: { status },
  });

  console.log(`[Worker] Document ${documentId} status: ${status}`);
 }
}
