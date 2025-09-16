import { usePixiApp } from './usePixiApp';
import { usePixiCharacter } from '../character/usePixiCharacter';
import { usePixiMovement } from '../character/usePixiMovement';
import { useKeyboardListener } from '../keyboard/useKeyboardListener';

export function usePixiGame() {
    // Inicializar PixiJS
    usePixiApp();

    // Configurar teclado
    useKeyboardListener();

    // Crear y manejar personaje
    usePixiCharacter();

    // Manejar movimiento
    usePixiMovement();
}
