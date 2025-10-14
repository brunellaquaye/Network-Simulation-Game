export type Device = {
    id: number;
    name: string;
    type: string;        // router, switch, server
    pingRate?: number | null;
    latency?: number | null;
    trafficLoad?: number | null;
    status?: string;     // online/offline
    lastUpdated?: Date;
}