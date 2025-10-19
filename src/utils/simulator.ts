import { Device, Status } from "./types";

export const simulateDevice = ({
  device,
  randomness,
}: {
  device: Device;
  randomness?: { Max_latency?: number; Min_latency?: number; error_probability?: number };
}): Device => {
  const Max_latency = randomness?.Max_latency ?? 100;
  const Min_latency = randomness?.Min_latency ?? 10;
  const error_probability = randomness?.error_probability ?? 100;

  const { latency = 50, trafficLoad = 0, status } = device;
  let new_latency = latency;
  const errorChance = error_probability / 100;

  if (Math.random() < errorChance) {
    // network instability
    const change = (Math.random() - 0.5) * 2 * (Max_latency - Min_latency) * 0.3;
    new_latency += change;
  } else {
    // normal drift
    const change = Math.random() * 6 - 3;
    new_latency += change;
  }

  // Recovery when latency is high
  if (new_latency > 80 && Math.random() < 0.5) {
    new_latency -= Math.random() * 15 + 5;
  }

  // Clamp within bounds
  new_latency = Math.min(Max_latency, Math.max(Min_latency, new_latency));

  // Smarter status logic
  let new_status = Status.ONLINE;
  if (new_latency >= Max_latency - 15) {
    if (status === Status.OFFLINE || Math.random() < 0.8) {
      new_status = Status.OFFLINE;
    }
  }

  // Adjust traffic load
  const new_trafficLoad =
    new_status === Status.OFFLINE
      ? 0
      : Math.max(0, trafficLoad + (Math.random() * 10 - 5));

  return {
    ...device,
    latency: new_latency,
    trafficLoad: new_trafficLoad,
    status: new_status,
    lastUpdated: new Date(),
  };
};
