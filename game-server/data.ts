import { FoodItem, Rarity } from "./types";

export const CANVAS_WIDTH = 700;
export const CANVAS_HEIGHT = 600;

export const ERROR_MESSAGE =
  "Bruhhh, do you want the snake to do a backflip or something??";

export const RarityValues = ["small", "medium", "large", "epic"];

export const foods: { [key in Rarity]: FoodItem } = {
  small: { value: 1, rarity: 1, color: "cyan", lifetime: 10 },
  medium: { value: 3, rarity: 0.6, color: "teal", lifetime: 7 },
  large: { value: 5, rarity: 0.2, color: "yellow", lifetime: 5 },
  epic: { value: 15, rarity: 0.08, color: "purple", lifetime: 3 },
};
