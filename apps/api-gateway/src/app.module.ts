import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentModule } from './document/document.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, DocumentModule, IngestionModule]
})
export class AppModule { }
