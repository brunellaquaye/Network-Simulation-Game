export type Device = {
    id?: number;
    name: string;
    type: string;        // router, switch, server
    ipAddress?: string;
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: 'online' | 'offline';     // online/offline
    scenarioId: number;
    lastUpdated?: Date;
}

export type Scenario = {
    id?: number;
    name: string;
    difficulty: 'easy'|'medium'|'hard';
    timeLimit: number;
    createdAt?: Date;
    userId: number
}