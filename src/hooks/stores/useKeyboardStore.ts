import { create } from "zustand";
import type { KeyboardState } from "../../models/keyboard/interfaces/KeyboardState";

export const useKeyboardStore = create<KeyboardState>((set, get) => ({
    lastKey: undefined,
    pressedKeys: new Set<string>(),

    setLastKey: (key: string) => {
        set({ lastKey: key })
    },

    onKeyDown: (key: string) => {
        set((state: KeyboardState) => {
            if (state.pressedKeys.has(key)) {
                return { lastKey: key }
            }

            const newSet = new Set(state.pressedKeys)
            newSet.add(key)
            return { lastKey: key, pressedKeys: newSet }
        })
    },

    onKeyUp: (key: string) => {
        set((state: KeyboardState) => {
            const newSet = new Set(state.pressedKeys)
            newSet.delete(key)
            return { pressedKeys: newSet }
        })
    },

    pressVirtualKey: (key: string) => {
        set((state: KeyboardState) => {
            if (state.pressedKeys.has(key)) {
                return { lastKey: key }
            }

            const newSet = new Set(state.pressedKeys)
            newSet.add(key)
            return { lastKey: key, pressedKeys: newSet }
        })
    },

    releaseVirtualKey: (key: string) => {
        set((state: KeyboardState) => {
            const newSet = new Set(state.pressedKeys)
            newSet.delete(key)
            return { pressedKeys: newSet }
        })
    },

    isKeyPressed: (key: string) => get().pressedKeys.has(key),
}))