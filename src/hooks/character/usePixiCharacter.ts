import { usePixiAssets } from '../assets/usePixiAssets';
import { usePixiSprite } from './usePixiSprite';
import { usePixiSpriteAnimation } from './usePixiSpriteAnimation';

export function usePixiCharacter() {

    // Cargar assets
    usePixiAssets();

    // Crear sprite inicial
    usePixiSprite();

    // Animaciones de sprite
    usePixiSpriteAnimation();

}
