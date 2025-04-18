import {
 Controller, Post, Get, Param, Delete, UploadedFile,
 UseInterceptors, UseGuards, Request,
 HttpException,
 HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DocumentEntity } from './entities/document.entity';
import { RoleGuard } from '../auth/role/role.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RoleType } from 'generated/prisma';

@Controller('documents')
@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class DocumentController {
 constructor(private readonly documentsService: DocumentService) { }

 @Post('upload')
 @ApiConsumes("multipart/form-data")
 @Roles(RoleType.ADMIN, RoleType.EDITOR)
 @UseInterceptors(FileInterceptor('document', {
  storage: diskStorage({
   destination: './uploads',
   filename: (_, file, cb) => {
    const uniqueName = uuid() + extname(file.originalname);
    cb(null, uniqueName);
   }
  })
 }))
 @ApiOkResponse({ type: DocumentEntity })
 async uploadFile(
  @UploadedFile() document: Express.Multer.File,
  @Request() req
 ) {
  try {
   if (!document) {
    throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
   }

   const uploded_document = await this.documentsService.create(document, req.user.id);
   return new DocumentEntity(uploded_document);
  } catch (err) {
   throw new HttpException(
    err.message || 'Failed to upload document',
    err.status || HttpStatus.INTERNAL_SERVER_ERROR,
   );
  }
 }

 @Get()
 @Roles(RoleType.ADMIN, RoleType.EDITOR, RoleType.VIEWER)
 @ApiOkResponse({ type: DocumentEntity, isArray: true })
 findAll() {
  return this.documentsService.findAll();
 }

 @Get(':id')
 @Roles(RoleType.ADMIN, RoleType.EDITOR, RoleType.VIEWER)
 @ApiOkResponse({ type: DocumentEntity })
 findOne(@Param('id') id: string) {
  return this.documentsService.findOne(id);
 }

 @Delete(':id')
 @Roles(RoleType.ADMIN, RoleType.EDITOR)
 @ApiOkResponse({ type: DocumentEntity })
 remove(@Param('id') id: string) {
  return this.documentsService.remove(id);
 }
}