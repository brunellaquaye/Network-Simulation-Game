export interface Device {
    id: number;
    name: string;
    type: string;        // router, switch, server
    pingRate?: number;
    latency?: number;
    trafficLoad?: number;
    status?: 'online' | 'offline';     // online/offline
    lastUpdated?: Date;
}