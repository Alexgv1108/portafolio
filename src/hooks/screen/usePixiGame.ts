import { usePixiApp } from './usePixiApp';
import { usePixiCharacter } from '../character/usePixiCharacter';
import { usePixiMovement } from '../character/usePixiMovement';
import { useKeyboardListener } from '../keyboard/useKeyboardListener';

export function usePixiGame() {
    // Inicializar PixiJS
    const { app, isReady, containerRef } = usePixiApp();
    
    // Configurar teclado
    useKeyboardListener();
    
    // Crear y manejar personaje
    const {
        character,
        assetsLoaded,
        isMoving,
        moveCharacter,
        setDirection,
        getPosition,
    } = usePixiCharacter({ app, isReady });
    
    // Manejar movimiento
    const { currentDirection: movementDirection } = usePixiMovement({
        character,
        setDirection,
        moveCharacter,
        getPosition,
    });

    return {
        app,
        character,
        isReady: isReady && assetsLoaded,
        currentDirection: movementDirection,
        isMoving,
        containerRef,
    };
}
