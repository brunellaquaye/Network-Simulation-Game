import prisma from '../config/db';

export async function getAllScenarios({id, Userid}: {id: number,Userid: number}) {
    const results = await prisma.scenario.findMany({
            where: {
                userId: Userid
            }
        });
    return results;
}


