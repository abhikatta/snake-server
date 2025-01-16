"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foods = exports.RarityValues = exports.ERROR_MESSAGE = exports.CANVAS_HEIGHT = exports.CANVAS_WIDTH = void 0;
exports.CANVAS_WIDTH = 700;
exports.CANVAS_HEIGHT = 600;
exports.ERROR_MESSAGE = "Bruhhh, do you want the snake to do a backflip or something??";
exports.RarityValues = ["small", "medium", "large", "epic"];
exports.foods = {
    small: { value: 1, rarity: 1, color: "cyan", lifetime: 10 },
    medium: { value: 3, rarity: 0.6, color: "teal", lifetime: 7 },
    large: { value: 5, rarity: 0.2, color: "yellow", lifetime: 5 },
    epic: { value: 15, rarity: 0.08, color: "purple", lifetime: 3 },
};
