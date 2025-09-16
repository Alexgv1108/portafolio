import type { Direction } from '../enums/Direction';

export interface CharacterPosition {
    x: number;
    y: number;
}

export interface CharacterState {
    position: CharacterPosition;
    direction: Direction;
    isMoving: boolean;
    assetsLoaded: boolean;
    characterRef: unknown | null;
    isScrolling: boolean;
    setPosition: (x: number, y: number) => void;
    setDirection: (direction: Direction) => void;
    setIsMoving: (isMoving: boolean) => void;
    setAssetsLoaded: (loaded: boolean) => void;
    setCharacterRef: (ref: unknown) => void;
    setIsScrolling: (isScrolling: boolean) => void;
    getPosition: () => CharacterPosition;
}
