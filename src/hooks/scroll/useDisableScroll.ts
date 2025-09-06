import { useEffect } from 'react';

/**
 * Hook personalizado para deshabilitar el scroll manual del usuario
 * Previene scroll con mouse wheel, touch y teclas de navegación
 */
export function useDisableScroll() {
    useEffect(() => {
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        const preventKeyScroll = (e: KeyboardEvent) => {
            // Prevenir scroll con teclas de flecha, Page Up/Down, Home, End, spacebar
            const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
            if (scrollKeys.includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Eventos para deshabilitar scroll manual
        const wheelEvent = 'wheel';
        const touchMoveEvent = 'touchmove';
        const keydownEvent = 'keydown';

        // Agregar event listeners
        document.addEventListener(wheelEvent, preventScroll, { passive: false });
        document.addEventListener(touchMoveEvent, preventScroll, { passive: false });
        document.addEventListener(keydownEvent, preventKeyScroll, { passive: false });

        // Cleanup
        return () => {
            document.removeEventListener(wheelEvent, preventScroll);
            document.removeEventListener(touchMoveEvent, preventScroll);
            document.removeEventListener(keydownEvent, preventKeyScroll);
        };
    }, []);
}
