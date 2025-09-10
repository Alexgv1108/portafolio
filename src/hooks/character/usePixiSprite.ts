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

        const idleTexture = Assets.get('character-idle');
        if (!idleTexture) return;
        
        const character = idleTexture as Sprite & { _textureKey?: string };
        
        // Configurar posición y propiedades básicas
        const initialX = window.innerWidth / 2;
        const initialY = window.innerHeight / 2;
        
        character.x = initialX;
        character.y = initialY;
        
        if (character.anchor) {
            character.anchor.x = 0.5;
            character.anchor.y = 0.5;
        }
        
        // Escalado simple basado en dimensiones
        const dimensions = getCharacterDimensions();
        const scale = Math.min(
            dimensions.width / (character.width || dimensions.width),
            dimensions.height / (character.height || dimensions.height)
        );
        
        if (character.scale) {
            character.scale.x = scale;
            character.scale.y = scale;
        }
        
        character._textureKey = 'character-idle';

        app.stage.addChild(character);
        setCharacterRef(character);
        setPosition(initialX, initialY);

        return () => {
            if (character.parent) {
                character.parent.removeChild(character);
            }
        };
    }, [app, assetsLoaded, setCharacterRef, setPosition]);

}