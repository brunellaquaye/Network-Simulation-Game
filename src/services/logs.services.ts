import prisma from '../config/db';
import { Logs } from '../utils/types';

// create a new log linked to a device by deviceId
export const createDeviceLog = async(data: Logs): Promise<Logs> =>{
    const result = await prisma.log.create({
        data: data
    })
    return result;
} 

    // expose all to superAdmin 
export const exposeAllLogs  =async(adminId: number): Promise<Logs[] | null > => {
    const check = await prisma.user.findFirst({
        where: {
          AND: [
            {
              OR: [
                { role: 'superadmin' },
                { role: 'admin' }
                  ]
            },
            { id: adminId }
          ]
        }
});
    if(!check) return null;
    const result =
    (check.role==='superadmin') 
    ? await prisma.log.findMany({}) 
    : await prisma.log.findMany({
         where: {
           device: {
             scenario: {
               userId: adminId
             }
           }
         }
});
    return result;
}

export const getScenarioLogs = async(scenarioId: number) => {
    const results = await prisma.log.findMany({
         where: {
           device: {
             scenario: {
               id: scenarioId
             }
           }
         }
});
    if (results.length ===0) return null;

    return results;
}
export const getUserScenarioSessionLogs = async(scenarioId: number, userId: number) => {
    const results = await prisma.log.findMany({
           where: {
             device: {
              AND: [
            { scenarioId: scenarioId },
            { createdById: userId }
                  ]
           }
          }
});

    return results;
}

// Clear all Logs
export const ClearAllLogs = async(superId: number) => {
    const check = await prisma.user.findUnique({where: {id: superId}});
    if(!check || check.role !== 'superadmin') return null;
    const result = await prisma.log.deleteMany()
    return result;
} 