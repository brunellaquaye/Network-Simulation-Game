import { Device } from "./types";
export const simulateDevice = ({device,randomness}: 
  {device: Device; randomness?: { Max_latency?: number; Min_latency?: number };}): Device => {
  const Max_latency = randomness?.Max_latency ?? 100;
  const Min_latency = randomness?.Min_latency ?? 10;

  const {latency, trafficLoad, status } = device;

  const new_latency =(latency ?? 0) + Math.floor(Math.random() * Max_latency) + Min_latency;
  const new_trafficLoad =
              status === "offline"
                ? 0
                : (trafficLoad ?? 0) + (Math.random() * 10 - 5);
  const new_status = new_latency > 150 ? "offline" : "online";

  return {
    ...device,
    latency: new_latency,
    trafficLoad: new_trafficLoad,
    status: new_status,
    lastUpdated: new Date(),
  };
};
