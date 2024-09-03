import io from "socket.io-client";

const baseUrl = process.env.NODE_ENV === "production" ? "" : "//localhost:3030";
export const socketService = createSocketService();

socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        autoConnect: true,
      });
    },

    on(eventName, cb) {
      socket.on(eventName, cb);
    },

    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },

    emit(eventName, data) {
      if (!socket) {
        console.error("Socket is not initialized. Attempting to reconnect...");
        this.setup();
        return;
      }
      socket.emit(eventName, data);
    },

    subscribeToBoard(boardId) {
      if (!socket) this.setup();
      socket.emit("subscribe", boardId);
    },

    unsubscribeFromBoard(boardId) {
      if (!socket) return;
      socket.emit("unsubscribe", boardId);
    },

    subscribeToWorkspace() {
      if (!socket) this.setup();
      socket.emit("subscribe", "workspace");
    },

    unsubscribeFromWorkspace() {
      if (!socket) return;
      socket.emit("unsubscribe", "workspace");
    },

    // login(userId) {
    //   socket.emit(SOCKET_EMIT_LOGIN, userId);
    // },

    // logout() {
    //   socket.emit(SOCKET_EMIT_LOGOUT);
    // },

    terminate() {
      socket = null;
    },
  };
  return socketService;
}
