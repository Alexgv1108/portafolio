import { Direction } from "../models/enums/Direction";

export const keyToDirection: Record<string, Direction> = {
    w: Direction.Up,
    W: Direction.Up,
    s: Direction.Down,
    S: Direction.Down,
    a: Direction.Left,
    A: Direction.Left,
    d: Direction.Right,
    D: Direction.Right,
};