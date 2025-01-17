import { WebSocket, WebSocketServer } from "ws";
import { SnakeData } from "./types";
import { Food } from "./game-server/food";

const PORT = process.env.PORT || 3000;
const server = new WebSocketServer({ port: Number(PORT) });

console.log(`WebSocket server up!`);

const foodItem = new Food();
foodItem.createNewFoodItem();

server.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.on("message", (snakeData: SnakeData) => {
    const snakeDataObject = snakeData.toString();
    const data = JSON.stringify({
      snakeData: snakeDataObject,
      foodData: foodItem.getFoodData(),
    });

    server.clients.forEach((client: WebSocket) => {
      if (client !== socket && client.readyState === 1) {
        client.send(data);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
