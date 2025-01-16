"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var food_1 = require("./game-server/food");
var PORT = process.env.PORT || 3000;
var server = new ws_1.WebSocketServer({ port: Number(PORT) });
console.log("WebSocket server started on ws://localhost:".concat(PORT));
var foodItem = new food_1.Food();
foodItem.createNewFoodItem();
server.on("connection", function (socket) {
    console.log("Client connected");
    socket.on("message", function (snakeData) {
        var snakeDataObject = snakeData.toString();
        var data = JSON.stringify({
            snakeData: snakeDataObject,
            foodData: foodItem.getFoodData(),
        });
        server.clients.forEach(function (client) {
            if (client !== socket && client.readyState === 1) {
                client.send(data);
            }
        });
    });
    //   server.clients.forEach((client: WebSocket) => {
    //     if (client !== socket && client.readyState === 1) {
    //       console.log(
    //         `Sending food data to client: ${JSON.stringify({ foodData: foodData })}`
    //       );
    //       client.send(JSON.stringify(foodData));
    //     }
    //   });
    socket.on("close", function () {
        console.log("Client disconnected");
    });
});
