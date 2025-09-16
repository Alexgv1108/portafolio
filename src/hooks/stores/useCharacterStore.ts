import { create } from 'zustand';
import { Direction } from '../../models/character/enums/Direction';
import type { CharacterState, CharacterPosition } from '../../models/character/interfaces/CharacterState';

export const useCharacterStore = create<CharacterState>((set, get) => ({
    // Estado inicial
    position: { x: 0, y: 0 },
    direction: Direction.Idle,
    isMoving: false,
    assetsLoaded: false,
    characterRef: null,
    isScrolling: false,
    
    // Acciones
    setPosition: (x: number, y: number) => {
        const newPosition = { x, y };
        set({ position: newPosition });
    },
    
    setDirection: (direction: Direction) => {
        const moving = direction !== Direction.Idle;
        set({ 
            direction,
            isMoving: moving 
        });
    },
    
    setIsMoving: (isMoving: boolean) => set({ isMoving }),
    
    setAssetsLoaded: (loaded: boolean) => {
        set({ assetsLoaded: loaded });
    },
    
    setIsScrolling: (isScrolling: boolean) => set({ isScrolling }),

    setCharacterRef: (ref: unknown) => {
        set({ characterRef: ref });
        
        // Si el personaje se crea, inicializar posición
        if (ref) {
            const character = ref as unknown as { x?: number; y?: number };
            if (character.x !== undefined && character.y !== undefined) {
                get().setPosition(character.x, character.y);
            }
        }
    },
    
    getPosition: (): CharacterPosition => get().position,
}));
