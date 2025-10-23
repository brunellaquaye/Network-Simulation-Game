-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "position" JSONB;

-- CreateTable
CREATE TABLE "_DeviceConnections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DeviceConnections_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DeviceConnections_B_index" ON "_DeviceConnections"("B");

-- AddForeignKey
ALTER TABLE "_DeviceConnections" ADD CONSTRAINT "_DeviceConnections_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceConnections" ADD CONSTRAINT "_DeviceConnections_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
