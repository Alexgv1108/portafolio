import type { Direction } from "../enums/Direction";

export interface CharacterState {
    x: number;
    y: number;
    direction: Direction;
    changeDirection: (newDirection: Direction) => void;
    move: (dx: number, dy: number) => void;
}