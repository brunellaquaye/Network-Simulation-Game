import prisma from "../config/db";
import { simulateDevice } from "../utils/simulator";
import { SessionDevice, Status } from "../generated/prisma";
import { createSessionLog } from "./logs.services";
import { io } from "../server";

/**
 * Run a live simulation tick for a player's session
 */
export async function runSessionSimulation({
  sessionId,
  randomness,
}: {
  sessionId: number;
  randomness: object;
}) {
  /**
   Get the active simulation session with all session devices
   */
  const session = await prisma.simulationSession.findUnique({
    where: { id: sessionId },
    include: { devices: true },
  });

  if (!session || !session.devices.length) return null;

  const updatedDevices: SessionDevice[] = [];
  const logsToCreate: {
    sessionId: number;
    deviceId?: number;
    eventType: string;
    message: string;
  }[] = [];

  /** 
  Run the simulation logic for each device
     */ 
  for (const device of session.devices) {
    const oldStatus = device.status as Status;
    const new_state = simulateDevice({
      device: { ...device, status: device.status as Status } as SessionDevice,
      randomness,
    });

    updatedDevices.push(new_state);

    /**
     If status changes, log it
    */
    if (oldStatus !== new_state.status) {
      const itFailed = new_state.status === Status.offline;
      logsToCreate.push({
        sessionId: session.id,
        deviceId: new_state.id,
        eventType: itFailed ? "failure" : "recovery",
        message: itFailed
          ? `Device ${device.name} went offline.`
          : `Device ${device.name} recovered.`,
      });
    }
  }

  /**
  Apply DB updates and logs
     */
  await Promise.all([
    ...updatedDevices.map((d) =>
      prisma.sessionDevice.update({
        where: { id: d.id },
        data: {
          status: d.status,
          latency: d.latency,
          trafficLoad: d.trafficLoad,
          lastUpdated: new Date(),
        },
      })
    ),
    ...logsToCreate.map(createSessionLog),
  ]);

  /**
   Emit updates to frontend (socket.io)
   */
  io.to(`session_${sessionId}`).emit("sessionUpdate", {
    sessionId,
    updatedDevices,
    logs: logsToCreate,
    timestamp: new Date(),
  });

  /**
   Return the refreshed session state
    */
  return {
    ...session,
    devices: updatedDevices,
  };
}
