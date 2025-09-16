import { create } from "zustand";
import type { KeyboardState } from "../../models/keyboard/interfaces/KeyboardState";

export const useKeyboardStore = create<KeyboardState>((set, get) => ({
    lastKey: undefined,
    pressedKeys: new Set<string>(),

    setLastKey: (key: string) => {
        set({ lastKey: key })
    },

    onKeyDown: (key: string) => {
        const normalizedKey = key.toLowerCase();
        set((state: KeyboardState) => {
            // Si la tecla ya está presionada, no hacer nada
            if (state.pressedKeys.has(normalizedKey)) {
                return state;
            }

            const newSet = new Set(state.pressedKeys);
            newSet.add(normalizedKey);
            return { lastKey: normalizedKey, pressedKeys: newSet };
        })
    },

    onKeyUp: (key: string) => {
        const normalizedKey = key.toLowerCase();
        set((state: KeyboardState) => {
            const newSet = new Set(state.pressedKeys);
            newSet.delete(normalizedKey);
            return { pressedKeys: newSet };
        })
    },

    pressVirtualKey: (key: string) => {
        const normalizedKey = key.toLowerCase();
        set((state: KeyboardState) => {
            if (state.pressedKeys.has(normalizedKey)) {
                return state;
            }

            const newSet = new Set(state.pressedKeys);
            newSet.add(normalizedKey);
            return { lastKey: normalizedKey, pressedKeys: newSet };
        })
    },

    releaseVirtualKey: (key: string) => {
        const normalizedKey = key.toLowerCase();
        set((state: KeyboardState) => {
            const newSet = new Set(state.pressedKeys);
            newSet.delete(normalizedKey);
            return { pressedKeys: newSet };
        })
    },

    clearAllKeys: () => {
        set({ pressedKeys: new Set<string>() });
    },

    isKeyPressed: (key: string) => get().pressedKeys.has(key.toLowerCase()),
}));