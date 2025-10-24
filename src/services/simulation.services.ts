import { simulateDevice } from "../utils/simulator";
import { changeDeviceDetails } from "./device.services";
import { Device, Logs, Scenario, Status } from "../utils/types";
import { getSpecificScenarios } from "./scenario.services";
import { createDeviceLog } from "./logs.services";
import { io } from "../server";

export async function runScenarioSimulation({
  id,
  randomness,
}: {
  id: number;
  randomness: object;
}): Promise<(Scenario & { devices: Device[] }) | null> {
  const scenario = (await getSpecificScenarios({ id, addDevices: "true" })) as
    | (Scenario & { devices: Device[] })
    | null;

  if (!scenario || !scenario.devices?.length) return null;

  const updatedDevices: Device[] = [];
  const logsToCreate: Logs[] = [];

  for (let device of scenario.devices) {
    const oldStatus = device.status as Status;
    const new_state = simulateDevice({
      device: { ...device, status: device.status as Status },
      randomness,
    });

    updatedDevices.push(new_state);

    if (oldStatus !== new_state.status) {
      const itFailed = new_state.status === Status.offline;
      logsToCreate.push({
        deviceId: new_state.id,
        eventType: itFailed ? "failure" : "recovery",
        message: itFailed
          ? `Device ${device.name} went offline.`
          : `Device ${device.name} is back online.`,
      });
    }
  }

  // Apply DB updates and logs
  await Promise.all([
    ...updatedDevices.map(changeDeviceDetails),
    ...logsToCreate.map(createDeviceLog),
  ]);

  
    // io.to(userId).emit("deviceUpdate", { //emit to specific rooms
    io.emit("deviceUpdate", {
      scenarioId: id,
      updatedDevices,
      logsToCreate,
      timestamp: new Date(),
    });
 

  return { ...scenario, devices: updatedDevices };
}
