export type Device = {
    id: number;
    name: string;
    type: string;        // router, switch, server
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: string;     // online/offline
    lastUpdated?: Date;
}