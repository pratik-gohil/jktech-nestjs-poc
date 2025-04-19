-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Ingestion" (
    "id" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingestion_documentId_key" ON "Ingestion"("documentId");

-- AddForeignKey
ALTER TABLE "Ingestion" ADD CONSTRAINT "Ingestion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
