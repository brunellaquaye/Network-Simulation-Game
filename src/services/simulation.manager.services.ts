// src/services/simulation.manager.ts
import { runScenarioSimulation } from "./simulation.services";

const simulationLoops = new Map<number, NodeJS.Timeout>();

export function startSimulationLoop(id: number, randomness: any) {
  if (simulationLoops.has(id)) return; // Already running

  const interval = setInterval(async () => {
    try {
      await runScenarioSimulation({ id, randomness});
    } catch (err) {
      console.error(`Simulation ${id} failed:`, err);
    }
  }, 5000); // every 5 seconds

  simulationLoops.set(id, interval);
  console.log(`Simulation ${id} started.`);
}

export function stopSimulationLoop(id: number) {
  const interval = simulationLoops.get(id);
  if (interval) {
    clearInterval(interval);
    simulationLoops.delete(id);
    console.log(`Simulation ${id} stopped.`);
  }
}

export function isSimulationRunning(id: number) {
  return simulationLoops.has(id);
}
