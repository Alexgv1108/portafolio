import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { Direction } from '../../models/character/enums/Direction';
import type { UsePixiCharacterProps } from '../../models/character/interfaces/UsePixiCharacterProps';
import { useCharacterStore } from '../../stores/useCharacterStore';
import { usePixiAssets } from '../assets/usePixiAssets';
import { usePixiSprite } from './usePixiSprite';
import { usePixiSpriteAnimation } from './usePixiSpriteAnimation';

export function usePixiCharacter({ app, isReady }: UsePixiCharacterProps) {
    const { direction, setDirection } = useCharacterStore(
        useShallow((state) => ({
            direction: state.direction,
            setDirection: state.setDirection,
        }))
    );

    // Cargar assets
    const { assetsLoaded } = usePixiAssets({ isReady });
    
    // Crear sprite inicial
    usePixiSprite({ app, assetsLoaded });
    
    // Animaciones de sprite
    const { updateCharacterSprite } = usePixiSpriteAnimation({ 
        app, 
        assetsLoaded 
    });

    // Escuchar cambios de dirección del store y actualizar sprite
    useEffect(() => {
        if (assetsLoaded) {
            const moving = direction !== Direction.Idle;
            updateCharacterSprite(direction, moving);
        }
    }, [direction, assetsLoaded, updateCharacterSprite]);

    const handleSetDirection = (newDirection: Direction) => {
        setDirection(newDirection);
        const moving = newDirection !== Direction.Idle;
        updateCharacterSprite(newDirection, moving);
    };

    return {
        setDirection: handleSetDirection,
    };
}
