import type { Server, Socket } from "socket.io";
import { logger } from "./logger";

export function socketHandler(io: Server, socket: Socket) {
  logger(`New connection: ${socket.id}`);
  // we want to be sending messages to only specific simulation sections
  socket.on("JoinRoom", (userId) => {
    socket.join(userId);
    logger(`User: ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    logger(`Disconnected: ${socket.id}`);
  });
}
