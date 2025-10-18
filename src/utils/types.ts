export enum Status{
    ONLINE = 'online',
    OFFLINE = 'offline'
}
export type Device = {
    id?: number;
    name: string;
    type: string;        // router, switch, server
    ipAddress?: string;
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: Status;     // online/offline
    scenarioId: number;
    lastUpdated?: Date;
}
export enum difficulty{
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}
export type Scenario = {
    id?: number;
    name: string;
    difficulty: difficulty;
    timeLimit: number;
    createdAt?: Date;
    userId: number
}