import { Device } from "./types";


export const simulateDevice = (device: Device): Device => {
  const latency = Math.floor(Math.random() * 100) + 10;
  const trafficLoad = Math.random() * 100;
  const status = latency > 150 ? "offline" : "online";

  return {
    ...device,
    latency,
    trafficLoad,
    status,
    lastUpdated: new Date(),
  };
}

