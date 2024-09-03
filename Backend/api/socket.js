import { SocketHandler } from "@vercel/node";
import { Server } from "socket.io";

export default SocketHandler((req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("subscribe", (boardId) => {
        socket.join(boardId);
        console.log(`Client subscribed to board: ${boardId}`);
      });

      socket.on("unsubscribe", (boardId) => {
        socket.leave(boardId);
        console.log(`Client unsubscribed from board: ${boardId}`);
      });

      socket.on("board-updated", (board) => {
        socket.to(board.id).emit("board-updated", board);
        socket.to("workspace").emit("workspace-updated", board);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  res.end();
});
