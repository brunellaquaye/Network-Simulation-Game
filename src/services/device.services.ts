import prisma from '../config/db';
import { Prisma } from '../generated/prisma';
import { Device } from '../utils/types';

/*
*  Check if a base (admin) device exists
 */
export async function checkAvailability(id: number) {
  return await prisma.device.findFirst({ where: { id } });
}

/**
*Get all base devices (admin/dev mode)
 */ 
export async function getAllDevices(): Promise<Device[]> {
  return await prisma.device.findMany();
}

/*
 ✅ Get all logs for a *base* device (for admin analysis only)
 */
export async function getDeviceLogs(id: number) {
  const check = await checkAvailability(id);
  if (!check) return null;

  /*
   Base logs are optional — mostly used by admin scenarios
   */
  const results = await prisma.log.findMany({
    where: { deviceId: id },
  });
  return { ...check, logs: results };
}

/*
 Add a new base device to a scenario (admin)
  */
export async function addNewDevice(data: Omit<Device, 'id'>): Promise<Device> {
  return await prisma.device.create({
    data: {
      ...data,
      position: data.position as Prisma.InputJsonValue,
    },
  });
}

/*
 Update base device details
  */
export async function changeDeviceDetails({
  id,
  name,
  type,
  ipAddress,
  pingRate,
  latency,
  trafficLoad,
  status,
}: Partial<Device>): Promise<Device | null> {
  const check = await checkAvailability(id!);
  if (!check) return null;

  return await prisma.device.update({
    where: { id },
    data: {
      name,
      type,
      ipAddress,
      pingRate,
      latency,
      trafficLoad,
      status,
    },
  });
}

/*
 Delete a base device
 */
export async function deleteDevice({ id }: { id: number }): Promise<Device | null> {
  const check = await checkAvailability(id);
  if (!check) return null;

  return await prisma.device.delete({ where: { id } });
}
