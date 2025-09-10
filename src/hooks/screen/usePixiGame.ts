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
    const { setDirection } = usePixiCharacter({ app, isReady });
    
    // Manejar movimiento
    const { currentDirection: movementDirection } = usePixiMovement();

    return {
        app,
        isReady,
        currentDirection: movementDirection,
        containerRef,
        setDirection,
    };
}
