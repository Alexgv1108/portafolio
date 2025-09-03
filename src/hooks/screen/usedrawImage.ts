import { useEffect } from "react";
import type { DrawImageOptions } from "../../models/interfaces/DrawImageOptions";
import { useCanvasStore } from "../stores/useCanvasStore";
import { useShallow } from "zustand/shallow";

export function useDrawImage({
    src,
    x = 0,
    y = 0,
    width,
    height,
    clear = false,
}: DrawImageOptions) {
    const { ctx } = useCanvasStore(
        useShallow((state) => ({
            ctx: state.ctx,
        }))
    );

    useEffect(() => {
        if (!ctx) return;
        const img = new Image();
        img.src = src;

        img.onload = () => {
            if (clear) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }

            if (width && height) {
                ctx.drawImage(img, x, y, width, height);
            } else {
                ctx.drawImage(img, x, y);
            }
        };
    }, [ctx, src, x, y, width, height, clear]);
}
