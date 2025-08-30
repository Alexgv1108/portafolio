import { create } from "zustand";
import type { CharacterState } from "../../models/interfaces/CharacterState";
import { Direction } from "../../models/enums/Direction";

const SPRITE_WIDTH = 160; // en px
const SPRITE_HEIGHT = 256; // en px (h-64)

export const useCharacterStore = create<CharacterState>((set) => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 - SPRITE_WIDTH / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 - SPRITE_HEIGHT / 2 : 0,
    direction: Direction.Idle,
    changeDirection: (newDirection: Direction) => set({ direction: newDirection }),
    move: (dx: number, dy: number) =>
        set((state) => ({
            x: state.x + dx,
            y: state.y + dy,
        })),
}));

