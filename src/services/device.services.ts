import prisma from '../config/db';
import { Device } from '../utils/types';

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

// todo: decide if scenario is changeable
export async function changeDeviceDetails({id,name, type,ipAddress,pingRate,latency,trafficLoad}: Device) {
    const results = await prisma.device.update({
        where: { id: id }, 
        data: { 
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

export async function deleteDevice({id}: {id: number} ) {
    const results = await prisma.device.delete({
        where: { id: id } 
    });
    return results;
}


