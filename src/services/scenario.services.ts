import prisma from '../config/db';
import { Scenario } from '../utils/types';

export async function getAllScenarios({ Userid}: {Userid: number}) {
    const results = await prisma.scenario.findMany({
            where: {
                userId: Userid
            }
        });
    return results;
}

export async function getSpecificScenarios({id: id}: {id: number}) {
    const results = await prisma.scenario.findMany({
            where: { id: id},
            include: {devices: true}
        });
    return results;
}


export async function addNewScenario({userId,name,difficulty,timeLimit}: Scenario) {
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

export async function changeScenarioDetails({id,name,difficulty,timeLimit, userId}: Scenario) {
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

export async function deleteScenario({id: id}: {id: number}) {
    const check = await prisma.scenario.findFirst({where: {id}}); if (!check) return null;
    const results = await prisma.scenario.delete({
        where: { id: id } 
    });
    return results;
}
