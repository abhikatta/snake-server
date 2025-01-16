"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var PORT = process.env.PORT || 3000;
var server = new ws_1.WebSocketServer({ port: Number(PORT) });
console.log("WebSocket server started on ws://localhost:".concat(PORT));
server.on("connection", function (socket) {
    console.log("Client connected");
    socket.on("message", function (snakeData) {
        var snakeDataObject = snakeData.toString();
        console.log("Received data: ".concat(snakeDataObject));
        server.clients.forEach(function (client) {
            if (client !== socket && client.readyState === 1) {
                client.send(snakeDataObject);
            }
        });
    });
    socket.on("close", function () {
        console.log("Client disconnected");
    });
});
