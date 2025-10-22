import prisma from '../config/db';
import { Device, Scenario } from '../utils/types';

export async function getAllUserScenarios({Userid,addDevices}: { Userid: number; addDevices?: string;}): Promise<Scenario[]> {
    const include = addDevices === "true" ? { devices: true } : undefined;
  const results = await prisma.scenario.findMany({
    where: { userId: Userid },
    include
  });

  return results;
}

export async function getAllScenarios(): Promise<Scenario[]> {
  const results = await prisma.scenario.findMany({ });

  return results;
}

export async function getSpecificScenarios({id, addDevices}: {id: number, addDevices?: string}): Promise<Scenario | Scenario & {devices: Device[]} | null> {
    const results = await prisma.scenario.findUnique({
            where: { id: id},
             include: addDevices === "true" ? { devices: {include: {logs: true}} } : undefined
        });
    if (!results) return null;
    return results;
}


export async function addNewScenario({userId,name,difficulty,timeLimit}: Scenario): Promise<Scenario | null> {
    const check = await prisma.user.findFirst({where: {id: userId}}); if (!check) return null;
         const results = await prisma.scenario.create({
        data: { 
            name: name,
            difficulty: difficulty,
            timeLimit: timeLimit,
            userId: userId
         }
        })
        return results;
}

export async function changeScenarioDetails({id,name,difficulty,timeLimit}: Omit<Scenario, 'userId'>): Promise<Scenario | null> {
const check = await prisma.scenario.findFirst({where: {id}}); if (!check) return null;
    const results = await prisma.scenario.update({
        where: { id: id }, 
        data: { 
            name: name,
            difficulty : difficulty,
            timeLimit: timeLimit
         }
    });
    return results;
}

export async function deleteScenario({id: id}: {id: number}): Promise<Scenario | null> {
    const check = await prisma.scenario.findFirst({where: {id}}); if (!check) return null;
    const results = await prisma.scenario.delete({
        where: { id: id } 
    });
    return results;
}
