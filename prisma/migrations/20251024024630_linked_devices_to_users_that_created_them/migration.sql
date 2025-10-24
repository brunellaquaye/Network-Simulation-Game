-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
