import prisma from '../config/db';

export async function getAllScenarios({id}: {id: number}) {
    const results = await prisma.scenario.findMany({
            where: {
                userId: id
            }
        });
    return results;
}


