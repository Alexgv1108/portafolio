import { Direction } from "../models/character/enums/Direction";

export const directionVectors: Record<Direction, [number, number]> = {
    [Direction.Idle]: [0, 0],
    [Direction.Up]: [0, -1],
    [Direction.Down]: [0, 1],
    [Direction.Left]: [-1, 0],
    [Direction.Right]: [1, 0],
    [Direction.UpLeft]: [-1, -1],
    [Direction.UpRight]: [1, -1],
    [Direction.DownLeft]: [-1, 1],
    [Direction.DownRight]: [1, 1],
};