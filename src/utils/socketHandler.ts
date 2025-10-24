import type { Server, Socket } from "socket.io";
import { log } from "./logger";

export function socketHandler(io: Server, socket: Socket) {
  log(`New connection: ${socket.id}`);
  // we want to be sending messages to only specific simulation sections
  socket.on('JoinRoom',(userId) =>{
    socket.join(userId)
    log(`User: ${userId} joined room`)
  })

  socket.on("disconnect", () => {
    log(`Disconnected: ${socket.id}`);
  });
}
