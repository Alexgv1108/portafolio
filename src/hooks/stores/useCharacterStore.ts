import { create } from "zustand";
import type { CharacterState } from "../../models/interfaces/CharacterState";
import { Direction } from "../../models/enums/Direction";

const SPRITE_WIDTH = 160; // en px
const MAX_VELOCITY = 600; // Velocidad máxima aumentada

export const useCharacterStore = create<CharacterState>((set, get) => ({
    // Posición actual
    x: typeof window !== "undefined" ? window.innerWidth / 2 - SPRITE_WIDTH / 2 : 0,
    y: 280,
    
    // Velocidad para interpolación suave
    velocityX: 0,
    velocityY: 0,
    
    // Estados
    isMoving: false,
    isScrolling: false,
    direction: Direction.Idle,

    setIsScrolling: (scrolling: boolean) => {
        const currentDirection = get().direction;
        set({
            isScrolling: scrolling,
            direction: scrolling ? Direction.Idle : currentDirection,
        });
    },

    changeDirection: (newDirection: Direction) => {
        set({ 
            direction: newDirection,
            isMoving: newDirection !== Direction.Idle
        });
    },

    // Movimiento directo con límites
    move: (dx: number, dy: number) => {
        set((state) => {
            const newX = Math.max(0, Math.min(state.x + dx, window.innerWidth - SPRITE_WIDTH));
            const newY = Math.max(0, Math.min(state.y + dy, window.innerHeight - 300));
            
            return { x: newX, y: newY };
        });
    },

    // Establecer posición directamente
    setPosition: (x: number, y: number) => {
        set({
            x: Math.max(0, Math.min(x, window.innerWidth - SPRITE_WIDTH)),
            y: Math.max(0, Math.min(y, window.innerHeight - 300)),
        });
    },

    // Actualizar velocidad sin fricción - movimiento directo
    updateVelocity: (vx: number, vy: number) => {
        set(() => {
            // Aplicar velocidad directamente sin fricción
            const newVx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vx));
            const newVy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vy));
            
            return {
                velocityX: newVx,
                velocityY: newVy,
            };
        });
    },

    setMoving: (moving: boolean) => {
        set({ isMoving: moving });
    },
}));

