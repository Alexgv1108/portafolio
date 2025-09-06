import { Direction } from '../enums/Direction';

export interface UsePixiMovementProps {
    character: unknown;
    setDirection: (direction: Direction) => void;
    moveCharacter: (x: number, y: number) => void;
    getPosition: () => { x: number; y: number };
}