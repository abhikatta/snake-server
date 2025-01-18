import { WebSocket, WebSocketServer } from "ws";
import { SnakeData } from "./types";
import { Food } from "./game-server/food";

const PORT = process.env.PORT || 3000;
const server = new WebSocketServer({ port: Number(PORT) });

console.log(`WebSocket server up!`);
const isEaten = (snake: SnakeData, food: Food) => {
  const snakePosition = { x: snake.x, y: snake.y };
  const foodPosition = {
    x: food.foodItemCenterX,
    y: food.foodItemCenterY,
  };
  if (
    food.foodItem &&
    food.foodItem.value &&
    Math.abs(snakePosition.x - foodPosition.x) <= 50 &&
    Math.abs(snakePosition.y - foodPosition.y) <= 50
  ) {
    let newScore = snake.score;
    newScore += food.foodItem?.value;

    return { isEaten: true, score: newScore };
  }
  return { isEaten: false, score: snake.score };
};
const foodItem = new Food();
foodItem.createNewFoodItem();

server.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.on("message", (snakeData: string) => {
    const snakeDataObject: SnakeData = JSON.parse(snakeData.toString());
    const { score: newScore, isEaten: isFoodEaten } = isEaten(
      snakeDataObject,
      foodItem
    );

    if (isFoodEaten) {
      foodItem.createNewFoodItem();
    }

    const updatedData = JSON.stringify({
      snakeData: { ...snakeDataObject, score: newScore },
      foodData: foodItem.getFoodData(),
    });

    server.clients.forEach((client: WebSocket) => {
      if (client !== socket && client.readyState === 1) {
        client.send(updatedData);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
