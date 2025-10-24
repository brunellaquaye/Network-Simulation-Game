// src/services/simulation.manager.ts
import { log } from "../utils/logger";
import { runScenarioSimulation } from "./simulation.services";

const simulationLoops = new Map<number, NodeJS.Timeout>();

export function startSimulationLoop(id: number, randomness: any) {
  if (simulationLoops.has(id)) return; // Already running

  const interval = setInterval(async () => {
    try {
      await runScenarioSimulation({ id, randomness});
    } catch (err) {
      log(`Simulation ${id} failed:`, err);
    }
  }, 5000); // every 5 seconds

  simulationLoops.set(id, interval);
  log(`Simulation ${id} started.`);
}

export function stopSimulationLoop(id: number) {
  const interval = simulationLoops.get(id);
  if (interval) {
    clearInterval(interval);
    simulationLoops.delete(id);
    log(`Simulation ${id} stopped.`);
  }
}

export function isSimulationRunning(id: number) {
  return simulationLoops.has(id);
}
