import { create } from "zustand";
import type { CanvasState } from "../../models/interfaces/CanvasState";

export const useCanvasStore = create<CanvasState>((set) => ({
    canvas: null,
    ctx: null,
    setCanvas: (canvas) =>
        set({
            canvas,
            ctx: canvas.getContext("2d"),
        }),
}));