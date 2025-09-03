import { useEffect, useRef, useCallback } from "react";
import { useCharacterStore } from "../stores/useCharacterStore";
import { useCanvasStore } from "../stores/useCanvasStore";
import { useShallow } from "zustand/shallow";
import type { CharacterSpriteOptions } from "../../models/interfaces/CharacterSpriteOptions";
import { useCharacterSprite } from "./useCharacterSprite";

export function useDrawCharacter({
    width,
    height,
    clear = true,
}: CharacterSpriteOptions) {
    const { ctx } = useCanvasStore(
        useShallow((state) => ({ ctx: state.ctx }))
    );

    const { direction, x, y } = useCharacterStore(
        useShallow((state) => ({
            direction: state.direction,
            x: state.x,
            y: state.y,
        }))
    );

    const sprite = useCharacterSprite(direction);

    const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
    const lastDrawRef = useRef<{ x: number; y: number; sprite: string } | null>(null);

    const draw = useCallback(() => {
        if (!ctx) return;

        let img = imageCache.current.get(sprite);

        if (!img) {
            img = new Image();
            img.src = sprite;
            imageCache.current.set(sprite, img);
            img.onload = () => {
                if (clear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(img!, x, y, width, height);
                lastDrawRef.current = { x, y, sprite };
            };
            return;
        }

        if (img.complete) {
            const last = lastDrawRef.current;
            if (last && last.x === x && last.y === y && last.sprite === sprite) {
                return;
            }

            if (clear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(img!, x, y, width, height);
            lastDrawRef.current = { x, y, sprite };
        }
    }, [ctx, sprite, x, y, width, height, clear]);

    useEffect(() => {
        draw();
    }, [draw]);
}