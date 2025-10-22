import { difficulty, Status } from "../generated/prisma";
export { Status };

export type Device = {
  id: number;
  name: string;
  type: string; // router, switch, server, load balancer, workstation, firewall, access point
  ipAddress?: string | null;
  pingRate?: number;
  latency?: number;
  trafficLoad?: number;
  status?: Status; // online/offline
  scenarioId: number;
  lastUpdated?: Date;
};

export type Scenario = {
  id?: number;
  name: string;
  difficulty: difficulty;
  timeLimit: number;
  createdAt?: Date;
  userId: number;
};

export type Logs = {
  id?: number;
  deviceId: number;
  timestamp?: Date;
  eventType: string; //failure, recovery
  message: string;
};
