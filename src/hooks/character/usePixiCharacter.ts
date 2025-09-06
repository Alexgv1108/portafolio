import { useState } from 'react';
import { Direction } from '../../models/character/enums/Direction';
import type { UsePixiCharacterProps } from '../../models/character/interfaces/UsePixiCharacterProps';
import { usePixiAssets } from '../assets/usePixiAssets';
import { usePixiSprite } from './usePixiSprite';
import { usePixiSpriteAnimation } from './usePixiSpriteAnimation';
import { usePixiCharacterPosition } from './usePixiCharacterPosition';

export function usePixiCharacter({ app, isReady }: UsePixiCharacterProps) {
    const [isMoving, setIsMoving] = useState(false);

    // Cargar assets
    const { assetsLoaded } = usePixiAssets({ isReady });
    
    // Crear sprite inicial
    const { characterRef } = usePixiSprite({ app, assetsLoaded });
    
    // Animaciones de sprite
    const { updateCharacterSprite } = usePixiSpriteAnimation({ 
        app, 
        assetsLoaded, 
        characterRef 
    });
    
    // Posición y movimiento
    const { moveCharacter, getPosition } = usePixiCharacterPosition({ characterRef });

    const setDirection = (direction: Direction) => {
        const moving = direction !== Direction.Idle;
        setIsMoving(moving);
        updateCharacterSprite(direction, moving);
    };

    return {
        character: characterRef.current,
        assetsLoaded,
        isMoving,
        moveCharacter,
        setDirection,
        getPosition,
    };
}
