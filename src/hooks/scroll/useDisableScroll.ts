import { useEffect, useState } from 'react';

/**
 * Hook personalizado para deshabilitar el scroll manual del usuario
 * Previene scroll con mouse wheel, touch y teclas de navegación
 * Optimizado para dispositivos móviles
 */
export function useDisableScroll() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                || window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

        // En móviles, ser más cuidadoso con los eventos táctiles
        const preventTouchScroll = (e: TouchEvent) => {
            // Solo prevenir si es un movimiento vertical (scroll)
            if (e.touches.length === 1) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Eventos para deshabilitar scroll manual
        const wheelEvent = 'wheel';
        const touchMoveEvent = 'touchmove';
        const keydownEvent = 'keydown';

        // Agregar event listeners con diferentes configuraciones para móvil/desktop
        if (isMobile) {
            // En móviles, usar un approach más suave
            document.addEventListener(touchMoveEvent, preventTouchScroll, { passive: false });
            document.addEventListener(keydownEvent, preventKeyScroll, { passive: false });
        } else {
            // En desktop, bloquear todo
            document.addEventListener(wheelEvent, preventScroll, { passive: false });
            document.addEventListener(keydownEvent, preventKeyScroll, { passive: false });
        }

        // Cleanup
        return () => {
            document.removeEventListener(wheelEvent, preventScroll);
            document.removeEventListener(touchMoveEvent, preventTouchScroll);
            document.removeEventListener(keydownEvent, preventKeyScroll);
        };
    }, [isMobile]);
}
