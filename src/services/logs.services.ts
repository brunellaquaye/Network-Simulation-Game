import prisma from '../config/db';
import { Device, Logs } from '../utils/types';

// get all logs of a particular device
export const getDeviceLogs = async(id: number): Promise<Device & {logs: Logs[]} | null> => {
    const check = await prisma.device.findFirst({where: {id}}); if (!check) return null;
    const result = await prisma.device.findUnique({where: {id},include: {logs: true}});
    return result;
    }
    // expose all to superAdmin 
export const exposeAllLogs  =async(superAdminId: number): Promise<Logs[] | null > => {
    const check = await prisma.user.findFirst({where: {AND: [{role:'superadmin'}, {id: superAdminId}]}}); 
    if(!check) return null;
    const result = await prisma.log.findMany({});
    return result;
}

// get all logs from scenarios of specific admin
export const exposeAdminLogs  =async(UserId: number): Promise<Logs[]> => {
    const results = await prisma.log.findMany({
         where: {
           device: {
             scenario: {
               userId: UserId
             }
           }
         }
});

    return results;
}
// create a new log linked to a device by deviceId
export const createDeviceLog = async(data: Logs): Promise<Logs> =>{
    const result = await prisma.log.create({
        data: data
    })
    return result;
} 