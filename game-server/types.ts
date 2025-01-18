export type DirectionValueType = 0 | -1 | 1;

export type Direction = {
  x: DirectionValueType;
  y: DirectionValueType;
};

export type Rarity = "small" | "medium" | "large" | "epic";

export type FoodItem = {
  value: number;
  rarity: number;
  color: string;
  lifetime: number;
};

export type FoodType = {
  foodItemCenterX: number;
  foodItemCenterY: number;
  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D | null;
  worldWidth: number;
  worldHeight: number;
  foodItemSize: { height: number; width: number };
  foodItem: FoodItem | null;
  foodTimeout: NodeJS.Timeout | null;
  score: Score | null;
  snake: Snake | null;
  createNewFoodItem: () => void;
  spawnFoodItem: () => void;
  drawFood: () => void;
  isEaten: () => boolean;
  unspawnFoodItem: (isAlreadyEaten: boolean) => void;
};

export type Score = {
  score: number;
  increaseScore: (scoreValue: number) => void;
  getScore: () => number;
};

export type Snake = {
  centerX: number;
  centerY: number;
  score: number;
  size: { length: number; width: number };

  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  worldWidth: number;
  worldHeight: number;

  direction: Direction;
  velocity: number;
  displacement: number;

  detectWallCollision: () => void;
  drawSnake: (direction: Direction) => void;
  moveSnake: (direction: Direction) => void;
};
