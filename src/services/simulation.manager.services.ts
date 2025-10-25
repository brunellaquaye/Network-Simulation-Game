import { logger } from "../utils/logger";
import { runSessionSimulation } from "./simulation.services";

const simulationLoops = new Map<number, NodeJS.Timeout>();

export function startSimulationLoop(id: number, randomness: any) {
  if (simulationLoops.has(id)) return; /* Already running*/

  const interval = setInterval(async () => {
    try {
      await runSessionSimulation({ sessionId: id, randomness });
    } catch (err) {
      logger(`Simulation Session ${id} failed:`, err);
    }
  }, 5000); /* every 5 seconds*/

  simulationLoops.set(id, interval);
  logger(`Simulation session ${id} started.`);
}

export function stopSimulationLoop(id: number) {
  const interval = simulationLoops.get(id);
  if (interval) {
    clearInterval(interval);
    simulationLoops.delete(id);
    logger(`Simulation session ${id} stopped.`);
  }
}

export function isSimulationRunning(id: number) {
  return simulationLoops.has(id);
}
