export type Device = {
    id?: number;
    name: string;
    type: string;        // router, switch, server
    ipAddress?: string;
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: string;     // online/offline
    scenarioId: number;
    lastUpdated?: Date;
}