import type { Server, Socket } from "socket.io";

export function socketHandler(io: Server, socket: Socket) {
  console.log(`New connection: ${socket.id}`);
  // we want to be sending messages to only specific simulation sections
  socket.on('JoinRoom',(userId) =>{
    socket.join(userId)
    console.log(`User: ${userId} joined room`)
  })

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
}
