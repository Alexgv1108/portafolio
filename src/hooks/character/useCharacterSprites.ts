import { useState, useEffect } from 'react';
import { waitForAllSprites, areAllSpritesLoaded } from '../../helpers/getCharacterSprite';

/**
 * Hook para manejar la carga de sprites del personaje
 * Asegura que el personaje solo se muestre cuando todas las imágenes estén cargadas
 */
export function useCharacterSprites() {
    const [spritesLoaded, setSpritesLoaded] = useState(areAllSpritesLoaded());
    const [isLoading, setIsLoading] = useState(!areAllSpritesLoaded());

    useEffect(() => {
        if (spritesLoaded) return;

        setIsLoading(true);

        waitForAllSprites()
            .then(() => {
                setSpritesLoaded(true);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                console.error('Error loading character sprites:', error);
                setIsLoading(false);
                // En caso de error, mostrar el personaje de todas formas
                setSpritesLoaded(true);
            });
    }, [spritesLoaded]);

    return {
        spritesLoaded,
        isLoading,
        shouldShowCharacter: spritesLoaded
    };
}
