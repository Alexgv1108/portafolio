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
            console.warn(`⚠️ Texture not found: ${textureKey}`);
            return;
        }

        // Verificación básica de que tenemos algo válido
        if (typeof newTexture !== 'object') {
            console.warn(`⚠️ Invalid texture type for: ${textureKey}`);
            return;
        }

        try {
            // Detección más robusta para GIFs animados (funciona en dev y build)
            const isAnimatedGIF = newTexture.constructor.name === '_AnimatedGIF' || 
                                  newTexture._isAnimatedGIF || 
                                  (newTexture.textures && Array.isArray(newTexture.textures)) ||
                                  textureKey.includes('character-'); // Fallback para nuestros assets
            
            if (isAnimatedGIF) {
                // Los GIFs animados tienen diferente estructura, no validar baseTexture
                if (!newTexture.width || !newTexture.height) {
                    console.warn(`⚠️ Invalid GIF dimensions for: ${textureKey}`, newTexture);
                    return;
                }
                
                // Guardar posición actual con validaciones
                const currentX = currentChar.x || 0;
                const currentY = currentChar.y || 0;
                const currentScale = currentChar.scale ? 
                    { x: currentChar.scale.x || 1, y: currentChar.scale.y || 1 } : 
                    { x: 1, y: 1 };
                const currentAnchor = currentChar.anchor ? 
                    { x: currentChar.anchor.x || 0.5, y: currentChar.anchor.y || 0.5 } : 
                    { x: 0.5, y: 0.5 };
                
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
                // Para texturas normales, validar dimensiones y baseTexture
                if (!newTexture.width || !newTexture.height) {
                    console.warn(`⚠️ Invalid texture dimensions for: ${textureKey}`, newTexture);
                    return;
                }
                
                // Verificar baseTexture solo para texturas normales
                if (!newTexture.baseTexture || !newTexture.baseTexture.valid) {
                    console.warn(`⚠️ BaseTexture not ready for: ${textureKey}`);
                    return;
                }
                
                try {
                    // Verificar que currentChar tenga la capacidad de recibir textures
                    if (!currentChar || typeof currentChar.texture === 'undefined') {
                        console.warn(`⚠️ Character sprite cannot receive textures`);
                        return;
                    }
                    
                    currentChar.texture = newTexture;
                    currentChar._textureKey = textureKey;
                } catch (textureError) {
                    console.warn('⚠️ Error setting texture:', textureError);
                    return;
                }
            }
        } catch (error) {
            console.error('❌ Error updating texture:', error);
            return;
        }
    };

    return { updateCharacterSprite };
}
