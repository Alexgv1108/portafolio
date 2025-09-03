import type { Direction } from "../enums/Direction";

export interface CharacterState {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    isMoving: boolean;
    isScrolling?: boolean;
    direction: Direction;
    
    // Actions
    setIsScrolling: (isScrolling: boolean) => void;
    changeDirection: (newDirection: Direction) => void;
    move: (dx: number, dy: number) => void;
    setPosition: (x: number, y: number) => void;
    updateVelocity: (vx: number, vy: number) => void;
    setMoving: (moving: boolean) => void;
}