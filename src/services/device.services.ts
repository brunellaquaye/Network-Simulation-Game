import prisma from '../config/db';
import { Device } from '../utils/types';

export async function checkAvailability(id: number){
   return await prisma.device.findFirst({where: {id}})
}

export async function getAllDevices() {
    const results = await prisma.device.findMany();
    return results;
}

export async function addNewDevice({scenarioId,name, type,ipAddress,pingRate,latency,trafficLoad}: Device) {
    const results = await prisma.device.create({
        data: {
            scenarioId : scenarioId,
            name: name,
            type: type,
            ipAddress: ipAddress,
            pingRate: pingRate,
            latency: latency,
            trafficLoad: trafficLoad
        }
    });
    return results;
}


export async function changeDeviceDetails({id,name, type,ipAddress,pingRate,latency,trafficLoad, status}: Partial<Device>) {
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

export async function deleteDevice({id}: {id: number} ) {
    const check = await checkAvailability(id); if (!check) return null;
    const results = await prisma.device.delete({
        where: { id: id } 
    });
    return results;
}


