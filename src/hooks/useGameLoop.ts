import { useCharacterMovement } from "./character/useCharacterMovement";
import { useCharacterPosition } from "./character/useCharacterPosition";
import { useDrawCharacter } from "./character/useDrawCharacter";
import { useCharacterSprites } from "./character/useCharacterSprites";
import { useNearBottom } from "./character/useNearBottom";
import { useKeyboardListener } from "./keyboard/useKeyboardListener";
import { useFullscreenCanvas } from "./screen/useFullscreenCanvas";

const SPRITE_WIDTH = 200;
const SPRITE_HEIGHT = 300;

export function useGameLoop() {
    const { shouldShowCharacter } = useCharacterSprites();
    
    useFullscreenCanvas();
    useKeyboardListener();
    useCharacterMovement();
    useCharacterPosition();
    useNearBottom();

    // Renderizado optimizado para evitar parpadeos
    useDrawCharacter({
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
        shouldRender: shouldShowCharacter,
    });
}