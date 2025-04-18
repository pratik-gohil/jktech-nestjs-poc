import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { rm } from 'fs/promises';

@Injectable()
export class DocumentService {
 constructor(private prisma: PrismaService) { }

 async create(document: Express.Multer.File, userId: string) {
  try {
   return this.prisma.document.create({
    data: {
     name: document.filename,
     path: document.path,
     mimeType: document.mimetype,
     uploadedBy: userId,
    },
   });
  } catch (error) {
   await rm(document.path);
   throw error;
  }
 }

 async findAll() {
  return this.prisma.document.findMany();
 }

 async findOne(id: string) {
  const doc = await this.prisma.document.findUnique({ where: { id } });
  if (!doc) throw new NotFoundException('Document not found');
  return doc;
 }

 async remove(id: string) {
  const document = await this.prisma.document.delete({ where: { id } });
  await rm(document.path);
  return document;
 }
}