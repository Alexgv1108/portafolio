import { create } from "zustand";
import type { CharacterState } from "../../models/interfaces/CharacterState";
import { Direction } from "../../models/enums/Direction";

const SPRITE_WIDTH = 160; // en px

export const useCharacterStore = create<CharacterState>((set, get) => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 - SPRITE_WIDTH / 2 : 0,
    y: 280,
    isScrolling: false,
    direction: Direction.Idle,

    setIsScrolling: (scrolling: boolean) => {
        const currentDirection = get().direction;
        set({
            isScrolling: scrolling,
            direction: scrolling ? Direction.Idle : currentDirection,
        });
    },

    changeDirection: (newDirection: Direction) => set({ direction: newDirection }),

    move: (dx: number, dy: number) =>
        set((state) => ({
            x: state.x + dx,
            y: state.y + dy,
        })),

    setX: (newX: number) => set({ x: newX }),

    setY: (newY: number) => set({ y: newY }),
}));

