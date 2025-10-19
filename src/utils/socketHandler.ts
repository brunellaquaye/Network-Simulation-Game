// socketHandler.ts
import type { Server, Socket } from "socket.io";

export function socketHandler(io: Server, socket: Socket) {
  console.log(`New connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
}
