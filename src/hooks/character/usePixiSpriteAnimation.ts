import { Assets, Sprite } from 'pixi.js';
import { useShallow } from 'zustand/shallow';
import { Direction } from '../../models/character/enums/Direction';
import { useCharacterStore } from '../stores/useCharacterStore';
import { useAppStore } from '../stores/useAppStore';
import { useEffect, useCallback } from 'react';

export function usePixiSpriteAnimation() {

    const { appZ, appAddChildToContainer } = useAppStore(
        useShallow((state) => ({
            appZ: state.appZ,
            appAddChildToContainer: state.appAddChildToContainer
        }))
    );

    const { characterRef, assetsLoaded, direction, setCharacterRef, isScrolling } = useCharacterStore(
        useShallow((state) => ({
            characterRef: state.characterRef,
            assetsLoaded: state.assetsLoaded,
            direction: state.direction,
            setCharacterRef: state.setCharacterRef,
            isScrolling: state.isScrolling,
        }))
    );

    const updateCharacterSprite = useCallback((direction: Direction, moving: boolean, isScrolling: boolean = false) => {
        if (!appZ || !assetsLoaded || !characterRef) return;

        const currentChar = characterRef as Sprite & {
            _textureKey?: string;
            destroyed?: boolean;
        };
        if (!currentChar || currentChar.destroyed) return;

        // Determinar textura necesaria
        let textureKey = 'character-idle';
        
        // Si está haciendo scroll, forzar idle independientemente de la dirección
        if (isScrolling) {
            textureKey = 'character-idle';
        } else if (moving && direction !== Direction.Idle) {
            switch (direction) {
                case Direction.Left:
                case Direction.UpLeft:
                case Direction.DownLeft:
                    textureKey = 'character-left';
                    break;
                case Direction.Right:
                case Direction.UpRight:
                case Direction.DownRight:
                    textureKey = 'character-right';
                    break;
                case Direction.Up:
                case Direction.Down:
                    textureKey = 'character-up-down';
                    break;
            }
        }

        // Solo cambiar si es diferente
        if (currentChar._textureKey === textureKey) return;

        const newTexture = Assets.get(textureKey);
        if (!newTexture || !newTexture.width) return;

        try {
            // Todos nuestros assets son GIFs, usar lógica simple
            const currentX = currentChar.x || 0;
            const currentY = currentChar.y || 0;
            const currentScale = currentChar.scale ?
                { x: currentChar.scale.x, y: currentChar.scale.y } : { x: 1, y: 1 };

            // Remover sprite actual
            if (currentChar.parent) {
                currentChar.parent.removeChild(currentChar);
            }

            // Crear nuevo sprite
            const newSprite = newTexture as Sprite & { _textureKey?: string };
            
            // Habilitar anti-aliasing para mejorar la calidad visual
            if (newSprite.texture && newSprite.texture.source) {
                newSprite.texture.source.scaleMode = 'linear';
            }
            
            newSprite.x = currentX;
            newSprite.y = currentY;
            if (newSprite.scale) {
                newSprite.scale.x = currentScale.x;
                newSprite.scale.y = currentScale.y;
            }
            if (newSprite.anchor) {
                newSprite.anchor.x = 0.5;
                newSprite.anchor.y = 0.5;
            }
            
            // Mejorar la calidad de renderizado
            newSprite.roundPixels = false;
            newSprite._textureKey = textureKey;

            appAddChildToContainer(newSprite);
            setCharacterRef(newSprite);
        } catch (error) {
            console.error('❌ Error updating character sprite:', error);
        }
    }, [appZ, assetsLoaded, characterRef, appAddChildToContainer, setCharacterRef]);

    // Escuchar cambios de dirección del store y actualizar sprite
    useEffect(() => {
        if (assetsLoaded) {
            const moving = direction !== Direction.Idle;
            updateCharacterSprite(direction, moving, isScrolling);
        }
    }, [direction, assetsLoaded, updateCharacterSprite, isScrolling]);

    return { updateCharacterSprite };
}