/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UsePixiCharacterPositionProps } from '../../models/character/interfaces/UsePixiCharacterPositionProps';

export function usePixiCharacterPosition({ characterRef }: UsePixiCharacterPositionProps) {
    const moveCharacter = (x: number, y: number) => {
        const character = characterRef.current as any;
        if (character && !character.destroyed) {
            try {
                character.x = x;
                character.y = y;
            } catch (e) {
                // Si hay error con setters, intentar silenciosamente continuar
                console.error(e);
            }
        }
    };

    const getPosition = () => {
        const character = characterRef.current as any;
        if (!character || character.destroyed) {
            return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        }
        
        // Para todos los GIFs, devolver las coordenadas directamente
        return {
            x: character.x,
            y: character.y,
        };
    };

    return { moveCharacter, getPosition };
}
