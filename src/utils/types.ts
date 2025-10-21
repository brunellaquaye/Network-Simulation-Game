import { difficulty, Status } from "../generated/prisma";
export { Status }

export type Device = {
    id: number;
    name: string;
    type: string;        // router, switch, server
    ipAddress?: string | null;
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: Status;     // online/offline
    scenarioId: number;
    lastUpdated?: Date;
}

export type Scenario = {
    id?: number;
    name: string;
    difficulty: difficulty;
    timeLimit: number;
    createdAt?: Date;
    userId: number
}