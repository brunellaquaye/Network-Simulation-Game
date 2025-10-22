import prisma from '../config/db';
import { Device, Logs } from '../utils/types';

export const getDeviceLogs = async(id: number): Promise<Device & {logs: Logs[]} | null> => {
    const check = await prisma.device.findFirst({where: {id}}); if (!check) return null;
    const result = await prisma.device.findUnique({where: {id},include: {logs: true}});
    return result;
    }

export const createDeviceLog = async(data: Logs): Promise<Logs> =>{
    const result = await prisma.log.create({
        data: data
    })
    return result;
} 