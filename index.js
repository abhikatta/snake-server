"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var food_1 = require("./game-server/food");
var PORT = process.env.PORT || 3000;
var server = new ws_1.WebSocketServer({ port: Number(PORT) });
console.log("WebSocket server up!");
var isEaten = function (snake, food) {
    var _a;
    var snakePosition = { x: snake.x, y: snake.y };
    var foodPosition = {
        x: food.foodItemCenterX,
        y: food.foodItemCenterY,
    };
    if (food.foodItem &&
        food.foodItem.value &&
        Math.abs(snakePosition.x - foodPosition.x) <= 50 &&
        Math.abs(snakePosition.y - foodPosition.y) <= 50) {
        var newScore = snake.score;
        newScore += (_a = food.foodItem) === null || _a === void 0 ? void 0 : _a.value;
        return { isEaten: true, score: newScore };
    }
    return { isEaten: false, score: snake.score };
};
var foodItem = new food_1.Food();
foodItem.createNewFoodItem();
server.on("connection", function (socket) {
    console.log("Client connected");
    socket.on("message", function (snakeData) {
        var snakeDataObject = JSON.parse(snakeData.toString());
        var _a = isEaten(snakeDataObject, foodItem), newScore = _a.score, isFoodEaten = _a.isEaten;
        if (isFoodEaten) {
            foodItem.createNewFoodItem();
        }
        var updatedData = JSON.stringify({
            snakeData: __assign(__assign({}, snakeDataObject), { score: newScore }),
            foodData: foodItem.getFoodData(),
        });
        server.clients.forEach(function (client) {
            if (client !== socket && client.readyState === 1) {
                client.send(updatedData);
            }
        });
    });
    socket.on("close", function () {
        console.log("Client disconnected");
    });
});
