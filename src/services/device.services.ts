import prisma from '../config/db';
import { Prisma } from '../generated/prisma';
import { Device, Logs } from '../utils/types';

export async function checkAvailability(id: number){
   return await prisma.device.findFirst({where: {id}})
}

export async function getAllDevices(): Promise<Device[]> {
    const results = await prisma.device.findMany();
    return results;
}                                           
export async function  getDeviceLogs(id: number): Promise<Device & {logs: Logs[]} | null> {
    const check = await checkAvailability(id!); if (!check) return null;
    const results = await prisma.device.findUnique({where: {id: id},include: {logs:true}});
    return results;
}

export async function addNewDevice(data: Omit<Device, 'id'>): Promise<Device>{
    const results = await prisma.device.create({
        data: {
            ...data, 
            position: data.position as Prisma.InputJsonValue
        }
    });
    return results;
}


export async function changeDeviceDetails({id,name, type,ipAddress,pingRate,latency,trafficLoad, status}: Partial<Device>): Promise<Device | null> {
    const check = await checkAvailability(id!); if (!check) return null;
    const results = await prisma.device.update({
        where: { id: id }, 
        data: { 
            name: name,
            type: type,
            ipAddress: ipAddress,
            pingRate: pingRate,
            latency: latency,
            status: status,
            trafficLoad: trafficLoad
         }
    });
    return results;
}

export async function deleteDevice({id}: {id: number} ): Promise<Device | null> {
    const check = await checkAvailability(id); if (!check) return null;
    const results = await prisma.device.delete({
        where: { id: id } 
    });
    return results;
}


