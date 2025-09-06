/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { Assets } from 'pixi.js';
import type { UsePixiSpriteProps } from '../../models/character/interfaces/UsePixiSpriteProps';
import { getCharacterDimensions } from '../../constants/characterDimensions';

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
        
        // Configurar tamaño y posición con escalado suave
        const dimensions = getCharacterDimensions();
        const scaleX = dimensions.width / (idleGif.texture?.width || dimensions.width);
        const scaleY = dimensions.height / (idleGif.texture?.height || dimensions.height);
        
        // Usar el menor factor de escala para mantener las proporciones y calidad
        const scale = Math.min(scaleX, scaleY);
        idleGif.scale.set(scale, scale);
        
        // Aplicar filtro LINEAR para imágenes normales (renderizado suave)
        if (idleGif.texture && idleGif.texture.baseTexture) {
            // En versiones nuevas de PixiJS, usar 'linear' directamente
            idleGif.texture.baseTexture.scaleMode = 'linear';
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
