import prisma from '../config/db';

export async function getAllDevices() {
    const results = await prisma.device.findMany();
    return results;
}

export async function addNewDevice({scenarioId,name, type}: {scenarioId: number,name: string, type: string}) {
    const results = await prisma.device.create({
        data: {
            scenarioId : scenarioId,
            name: name,
            type: type
        }
    });
    return results;
}

export async function changeDeviceDetails({id, name}: {id:number, name: string}) {
    const results = await prisma.device.update({
        where: { id: id }, 
        data: { name: name }
    });
    return results;
}

export async function deleteDevice({id}: {id: number} ) {
    const results = await prisma.device.delete({
        where: { id: 2 } 
    });
    return results;
}


