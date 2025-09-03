import { useEffect, useRef, useCallback } from "react";
import { useCharacterStore } from "../stores/useCharacterStore";
import { useCanvasStore } from "../stores/useCanvasStore";
import { useShallow } from "zustand/shallow";
import type { CharacterSpriteOptions } from "../../models/interfaces/CharacterSpriteOptions";
import { getCachedCharacterImage, areAllSpritesLoaded } from "../../helpers/getCharacterSprite";

export function useDrawCharacter({
    width,
    height,
    shouldRender = true,
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

    const lastDrawRef = useRef<{ x: number; y: number; direction: string } | null>(null);

    const draw = useCallback(() => {
        if (!ctx || !shouldRender) return;
        
        // Solo dibujar si todos los sprites están cargados
        if (!areAllSpritesLoaded()) return;

        // Intentar obtener la imagen cacheada
        const img = getCachedCharacterImage(direction);

        if (!img) return;

        // Limpiar el área anterior del personaje
        const last = lastDrawRef.current;
        if (last) {
            ctx.clearRect(last.x, last.y, width, height);
        }

        // Dibujar la imagen en la nueva posición
        ctx.drawImage(img, x, y, width, height);
        lastDrawRef.current = { x, y, direction };

    }, [ctx, direction, x, y, width, height, shouldRender]);

    // Ejecutar directamente cuando cambie la posición o dirección
    useEffect(() => {
        draw();
    }, [draw]);
}