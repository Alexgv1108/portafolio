/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assets } from 'pixi.js';
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

    // Función para cambiar sprite según dirección y movimiento
    const updateCharacterSprite = (direction: Direction, moving: boolean) => {
        if (!app || !assetsLoaded || !characterRef) {
            return;
        }

        const currentChar = characterRef as any;
        
        // Verificación adicional de seguridad
        if (!currentChar || currentChar.destroyed) {
            return;
        }

        // Determinar qué GIF necesitamos
        let textureKey: string;
        if (!moving || direction === Direction.Idle) {
            textureKey = 'character-idle';
        } else {
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
                default:
                    textureKey = 'character-idle';
            }
        }

        // Solo recrear si necesitamos un GIF diferente
        const currentTextureKey = currentChar._textureKey;
        
        if (currentTextureKey === textureKey) {
            // Ya tenemos el GIF correcto, no hacer nada
            return;
        }

        // Obtener la nueva textura
        const newTexture = Assets.get(textureKey);
        
        if (!newTexture) {
            return;
        }

        try {
            // Para GIFs animados, necesitamos manejar esto diferente
            if (newTexture.constructor.name === '_AnimatedGIF') {
                
                // Guardar posición actual
                const currentX = currentChar.x;
                const currentY = currentChar.y;
                const currentScale = { x: currentChar.scale.x, y: currentChar.scale.y };
                const currentAnchor = { x: currentChar.anchor.x, y: currentChar.anchor.y };
                
                // Remover el sprite actual
                if (currentChar.parent) {
                    currentChar.parent.removeChild(currentChar);
                }
                
                // El newTexture ya es un sprite para GIFs animados
                const newSprite = newTexture;
                try {
                    newSprite.x = currentX;
                    newSprite.y = currentY;
                    if (newSprite.scale) {
                        newSprite.scale.x = currentScale.x;
                        newSprite.scale.y = currentScale.y;
                    }
                    if (newSprite.anchor) {
                        newSprite.anchor.x = currentAnchor.x;
                        newSprite.anchor.y = currentAnchor.y;
                    }
                    newSprite._textureKey = textureKey;
                } catch (propertyError) {
                    console.warn('⚠️ Error setting sprite properties:', propertyError);
                    newSprite.x = currentX;
                    newSprite.y = currentY;
                    newSprite._textureKey = textureKey;
                }
                
                // Agregar al stage
                app.stage.addChild(newSprite);
                
                // Actualizar referencia en el store
                setCharacterRef(newSprite);
                
            } else {
                // Para texturas normales, cambiar solo la textura
                currentChar.texture = newTexture;
                currentChar._textureKey = textureKey;
            }
        } catch (error) {
            console.error('❌ Error updating texture:', error);
            return;
        }
    };

    return { updateCharacterSprite };
}
