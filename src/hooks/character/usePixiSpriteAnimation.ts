/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assets } from 'pixi.js';
import { Direction } from '../../models/character/enums/Direction';
import type { UsePixiSpriteAnimationProps } from '../../models/character/interfaces/UsePixiSpriteAnimationProps';
import { getCharacterDimensions } from '../../constants/characterDimensions';

export function usePixiSpriteAnimation({ app, assetsLoaded, characterRef }: UsePixiSpriteAnimationProps) {
    // Función para cambiar sprite según dirección y movimiento
    const updateCharacterSprite = (direction: Direction, moving: boolean) => {
        if (!app || !assetsLoaded || !characterRef.current) return;

        const currentChar = characterRef.current as any;
        
        // Verificación adicional de seguridad
        if (!currentChar || currentChar.destroyed) {
            return;
        }
        
        const { x, y } = currentChar;

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

        // Remover sprite actual con limpieza mejorada
        if (currentChar.parent) {
            currentChar.parent.removeChild(currentChar);
        }
        
        // Temporarily set to null to avoid race conditions
        characterRef.current = null;

        // Crear nuevo GIF
        const newCharacter = Assets.get(textureKey) as any;

        // Verificar que se creó correctamente antes de continuar
        if (!newCharacter) {
            console.error('Failed to get GIF asset');
            return;
        }

        // Marcar el sprite con su textureKey para evitar recreaciones innecesarias
        newCharacter._textureKey = textureKey;

        // Configurar nuevo GIF con proporciones correctas
        try {
            // Configurar anchor si está disponible
            if (newCharacter.anchor?.set) {
                newCharacter.anchor.set(0.5);
            } else if (newCharacter.anchor) {
                newCharacter.anchor.x = 0.5;
                newCharacter.anchor.y = 0.5;
            }
            
            // Configurar posición
            newCharacter.x = x;
            newCharacter.y = y;
            
            // Configurar tamaño con escalado suave
            const dimensions = getCharacterDimensions();
            const scaleX = dimensions.width / (newCharacter.texture?.width || dimensions.width);
            const scaleY = dimensions.height / (newCharacter.texture?.height || dimensions.height);
            
            // Usar el menor factor de escala para mantener las proporciones y calidad
            const scale = Math.min(scaleX, scaleY);
            newCharacter.scale.set(scale, scale);
            
            // Aplicar filtro LINEAR para imágenes normales (renderizado suave)
            if (newCharacter.texture && newCharacter.texture.baseTexture) {
                // En versiones nuevas de PixiJS, usar 'linear' directamente
                newCharacter.texture.baseTexture.scaleMode = 'linear';
            }
        } catch (e) {
            console.error('Error configuring GIF properties:', e);
            return;
        }

        // Agregar al stage
        app.stage.addChild(newCharacter);
        characterRef.current = newCharacter;
    };

    return { updateCharacterSprite };
}
