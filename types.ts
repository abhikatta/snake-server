export type DirectionValueType = 0 | -1 | 1;

export type Direction = {
  x: DirectionValueType;
  y: DirectionValueType;
};

export type snakeColorType = "black" | "white" | "gray";
export interface SnakeData {
  color: snakeColorType;
  x: number;
  y: number;
  direction: Direction;
  score: number;
}
