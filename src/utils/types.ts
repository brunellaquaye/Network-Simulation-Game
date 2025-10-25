import { Difficulty, Prisma, Status } from "../generated/prisma";
export { Status };

export type Device = {
  id: number;
  name: string;
  type: string; // router, switch, server, load balancer, workstation, firewall, access point
  ipAddress?: string | null;
  pingRate?: number;
  position: Prisma.JsonValue | null;
  latency?: number;
  trafficLoad?: number;
  status?: Status; // online/offline
  scenarioId: number;
  lastUpdated?: Date;
};

export type Scenario = {
  id?: number;
  name: string;
  difficulty: Difficulty;
  timeLimit: number;
  createdAt?: Date;
  userId: number;
};

/*  Player-specific simulation instance */
export type SimulationSession = {
  id?: number;
  scenarioId: number;
  userId: number;
  startedAt?: Date;
  endedAt?: Date | null;
  isActive: boolean;
};

/* Device clone for each player's session */
export type SessionDevice = {
  id: number;
  sessionId: number;
  name: string;
  type: string;
  ipAddress: string | null;
  pingRate: number;
  latency: number;
  trafficLoad: number;
  status: Status;
  lastUpdated: Date;
};

export type Logs = {
  id?: number;
  sessionId: number;
  deviceId?: number | null;
  timestamp?: Date;
  eventType: string /* e.g. "failure", "recovery" */;
  message: string;
};
