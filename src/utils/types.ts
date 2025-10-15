export type Device = {
    id: number;
    name: string;
    type: string;        // router, switch, server
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: 'online' | 'offline';     // online/offline
    lastUpdated?: Date;
}

export type Scenario = {
    id: number;
    name: string;
    difficulty?: string;
    timeLimit?: number;
    createdAt: Date;
    userId: number
}