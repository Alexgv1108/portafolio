import type { Direction } from "../enums/Direction";

export interface CharacterState {
    x: number;
    y: number;
    isScrolling?: boolean;
    direction: Direction;
    setIsScrolling: (isScrolling: boolean) => void;
    changeDirection: (newDirection: Direction) => void;
    move: (dx: number, dy: number) => void;
    setX: (newX: number) => void;
    setY: (newY: number) => void;
}