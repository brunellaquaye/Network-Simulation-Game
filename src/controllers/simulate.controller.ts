import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { startSimulationLoop, stopSimulationLoop, isSimulationRunning } from "../services/simulation.manager.services";

export const simulateDeviceState = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { start, randomness } = req.body;

  if (start === true) {
    if (isSimulationRunning(id)) {
      return res.status(400).json({ message: "Simulation already running." });
    }
    startSimulationLoop(id, randomness);
    return res.status(200).json({ message: `Simulation ${id} started.` });
  }

  if (start === false) {
    if (!isSimulationRunning(id)) {
      return res.status(400).json({ message: "No simulation running for this scenario." });
    }
    stopSimulationLoop(id);
    return res.status(200).json({ message: `Simulation ${id} stopped.` });
  }

  return res.status(400).json({ message: "Invalid request: 'start' must be true or false." });
});
