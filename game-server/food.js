"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var data_1 = require("./data");
// this is the entire food context, not just an item that will be destroyed after the snake eats it, should be
// probably refactored
//  requirments:
// 1. spawn food, max one item at a time
// 2. after a said time, the food vanishes
// 3. as rarity increases, food spawn and lifetime decrease // TODO
var Food = /** @class */ (function () {
    function Food() {
        this.foodItemCenterX = 0;
        this.foodItemCenterY = 0;
        this.canvasWidth = data_1.CANVAS_WIDTH;
        this.canvasHeight = data_1.CANVAS_HEIGHT;
        this.ctx = null;
        //   worldWidth = window.innerWidth - 100;
        //   worldHeight = window.innerHeight - 100;
        this.foodItemSize = { height: 50, width: 50 };
        this.foodItem = null;
        this.foodTimeout = null;
        this.score = null;
        this.snake = null;
        // canvas: HTMLCanvasElement, snake: Snake, score: Score
        // this.ctx = canvas.getContext("2d");
        // this.score = score;
        // this.snake = snake;
    }
    Food.prototype.createNewFoodItem = function () {
        var randomRarity = data_1.RarityValues[Math.floor(Math.random() * data_1.RarityValues.length)];
        this.foodItemCenterX = Math.floor(Math.random() * (this.canvasWidth - this.foodItemSize.width));
        this.foodItemCenterY = Math.floor(Math.random() * (this.canvasHeight - this.foodItemSize.height));
        this.foodItem = data_1.foods[randomRarity];
    };
    Food.prototype.spawnFoodItem = function () {
        var _this = this;
        var _a;
        if (this.foodTimeout) {
            clearInterval(this.foodTimeout);
            this.foodTimeout = null;
            this.foodItem = null;
        }
        this.createNewFoodItem();
        if (this.foodItem) {
            this.foodTimeout = setTimeout(function () {
                _this.foodItem = null;
                _this.spawnFoodItem();
            }, ((_a = this.foodItem) === null || _a === void 0 ? void 0 : _a.lifetime) * 1000);
        }
    };
    Food.prototype.drawFood = function () {
        if (this.ctx && this.foodItem) {
            this.isEaten();
            this.ctx.beginPath();
            this.ctx.roundRect(this.foodItemCenterX, this.foodItemCenterY, this.foodItemSize.width, this.foodItemSize.height, 10);
            this.ctx.fillStyle = this.foodItem.color;
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }
    };
    Food.prototype.isEaten = function () {
        if (this.snake && this.score && this.foodItem) {
            var snakePosition = { x: this.snake.centerX, y: this.snake.centerY };
            var foodPosition = { x: this.foodItemCenterX, y: this.foodItemCenterY };
            if (Math.abs(snakePosition.x - foodPosition.x) <= this.foodItemSize.width &&
                Math.abs(snakePosition.y - foodPosition.y) <= this.foodItemSize.height) {
                this.score.increaseScore(this.foodItem.value);
                this.unspawnFoodItem(true);
                return true;
            }
            return false;
        }
        return false;
    };
    Food.prototype.unspawnFoodItem = function (isAlreadyEaten) {
        if (this.foodTimeout) {
            clearTimeout(this.foodTimeout);
            this.foodTimeout = null;
        }
        this.foodItem = null;
        if (isAlreadyEaten) {
            this.spawnFoodItem();
        }
    };
    Food.prototype.getFoodData = function () {
        return {
            foodItemCenterX: this.foodItemCenterX,
            foodItemCenterY: this.foodItemCenterY,
            foodItemSize: this.foodItemSize,
            foodItem: this.foodItem,
        };
    };
    return Food;
}());
exports.Food = Food;
