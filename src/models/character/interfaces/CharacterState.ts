import type { Direction } from '../enums/Direction';

export interface CharacterPosition {
    x: number;
    y: number;
}

export interface CharacterState {
    // Estado del personaje
    position: CharacterPosition;
    direction: Direction;
    isMoving: boolean;
    assetsLoaded: boolean;
    characterRef: unknown | null;
    
    // Acciones para actualizar estado
    setPosition: (x: number, y: number) => void;
    setDirection: (direction: Direction) => void;
    setIsMoving: (isMoving: boolean) => void;
    setAssetsLoaded: (loaded: boolean) => void;
    setCharacterRef: (ref: unknown) => void;
    
    // Método para obtener posición (para compatibilidad)
    getPosition: () => CharacterPosition;
}
