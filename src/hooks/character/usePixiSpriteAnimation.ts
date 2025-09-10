/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assets, Sprite } from 'pixi.js';
import { useShallow } from 'zustand/shallow';
import { Direction } from '../../models/character/enums/Direction';
import { useCharacterStore } from '../../stores/useCharacterStore';

export function usePixiSpriteAnimation({ app, assetsLoaded }: { app: any; assetsLoaded: boolean }) {
    const { characterRef, setCharacterRef } = useCharacterStore(
        useShallow((state) => ({
            characterRef: state.characterRef,
            setCharacterRef: state.setCharacterRef,
        }))
    );

    const updateCharacterSprite = (direction: Direction, moving: boolean) => {
        if (!app || !assetsLoaded || !characterRef) return;

        const currentChar = characterRef as Sprite & { 
            _textureKey?: string; 
            destroyed?: boolean; 
        };
        if (!currentChar || currentChar.destroyed) return;

        // Determinar textura necesaria
        let textureKey = 'character-idle';
        if (moving && direction !== Direction.Idle) {
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
            newSprite._textureKey = textureKey;

            app.stage.addChild(newSprite);
            setCharacterRef(newSprite);
        } catch (error) {
            console.error('❌ Error updating character sprite:', error);
        }
    };

    return { updateCharacterSprite };
}
