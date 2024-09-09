import { Server } from "socket.io";
let io;
export function setupSocketAPI(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    },
  });

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
      // socket.broadcast.to(board.id).emit("board-updated", board);
      // socket.broadcast.to("workspace").emit("workspace-updated", board);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
}
export function emitToBoard(boardId, event, data) {
  if (io) {
    io.to(boardId).emit(event, data);
  }
}

export function emitToAll(event, data) {
  if (io) {
    io.emit(event, data);
  }
}
