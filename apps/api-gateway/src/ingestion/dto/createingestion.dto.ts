import { IsDefined, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateIngestionDto {
 @IsString()
 @IsDefined()
 @IsNotEmpty()
 @IsUUID()
 documentId: string;
}
