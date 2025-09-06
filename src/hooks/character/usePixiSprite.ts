/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { Assets } from 'pixi.js';
import type { UsePixiSpriteProps } from '../../models/character/interfaces/UsePixiSpriteProps';
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from '../../constants/characterDimensions';

export function usePixiSprite({ app, assetsLoaded }: UsePixiSpriteProps) {
    const characterRef = useRef<unknown>(null);

    useEffect(() => {
        if (!app || !assetsLoaded) return;

        // Crear sprite inicial (quieto) - ahora es un GIF
        const idleGif = Assets.get('character-idle') as any;
        
        // Configurar GIF con proporciones correctas
        try {
            if (idleGif.anchor?.set) {
                idleGif.anchor.set(0.5);
            } else if (idleGif.anchor) {
                idleGif.anchor.x = 0.5;
                idleGif.anchor.y = 0.5;
            }
        } catch {
            // No anchor available for this GIF
        }
        
        // Configurar tamaño y posición
        try {
            idleGif.width = CHARACTER_WIDTH;
            idleGif.height = CHARACTER_HEIGHT;
        } catch {
            // Si width/height fallan, usar scale
            try {
                const scaleX = CHARACTER_WIDTH / (idleGif.texture?.width || CHARACTER_WIDTH);
                const scaleY = CHARACTER_HEIGHT / (idleGif.texture?.height || CHARACTER_HEIGHT);
                idleGif.scale.set(scaleX, scaleY);
            } catch (e) {
                // Could not set scale for GIF
                console.error(e);
            }
        }
        
        idleGif.x = window.innerWidth / 2;
        idleGif.y = window.innerHeight / 2;
        
        // Marcar el sprite inicial con su textureKey
        idleGif._textureKey = 'character-idle';

        // Agregar al stage
        app.stage.addChild(idleGif);
        characterRef.current = idleGif;

        return () => {
            if (idleGif.parent) {
                idleGif.parent.removeChild(idleGif);
            }
        };
    }, [app, assetsLoaded]);

    return { characterRef };
}
