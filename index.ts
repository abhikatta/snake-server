import { WebSocket, WebSocketServer } from "ws";
import { SnakeData } from "./types";

const PORT = process.env.PORT || 3000;
const server = new WebSocketServer({ port: Number(PORT) });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

server.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.on("message", (snakeData: SnakeData) => {
    const snakeDataObject = snakeData.toString();
    console.log(`Received data: ${snakeDataObject}`);

    server.clients.forEach((client: WebSocket) => {
      if (client !== socket && client.readyState === 1) {
        client.send(snakeDataObject);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
