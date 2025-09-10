/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { Assets, Sprite } from 'pixi.js';
import type { UsePixiSpriteProps } from '../../models/character/interfaces/UsePixiSpriteProps';
import { getCharacterDimensions } from '../../constants/characterDimensions';
import { useCharacterStore } from '../../stores/useCharacterStore';

export function usePixiSprite({ app, assetsLoaded }: UsePixiSpriteProps) {
    const { setCharacterRef, setPosition } = useCharacterStore(
        useShallow((state) => ({
            setCharacterRef: state.setCharacterRef,
            setPosition: state.setPosition,
        }))
    );

    useEffect(() => {
        if (!app || !assetsLoaded) return;

        // Crear sprite inicial (quieto) - ahora es un GIF
        const idleTexture = Assets.get('character-idle');
        if (!idleTexture) {
            return;
        }
        
        const idleGif = new Sprite(idleTexture) as any;
        
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
        if (idleGif?.texture?.source) {
            idleGif.texture.source.scaleMode = 'linear';
        }
        
        const initialX = window.innerWidth / 2;
        const initialY = window.innerHeight / 2;
        
        idleGif.x = initialX;
        idleGif.y = initialY;
        
        // Marcar el sprite inicial con su textureKey
        idleGif._textureKey = 'character-idle';

        // Agregar al stage
        app.stage.addChild(idleGif);
        
        // Actualizar el store con el personaje y su posición
        setCharacterRef(idleGif);
        setPosition(initialX, initialY);

        return () => {
            if (idleGif.parent) {
                idleGif.parent.removeChild(idleGif);
            }
        };
    }, [app, assetsLoaded, setCharacterRef, setPosition]);

}