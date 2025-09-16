import { useEffect } from 'react';

/**
 * Hook que fuerza el scroll al inicio de la página en cada carga/recarga
 */
export function useScrollToTop() {
    useEffect(() => {
        // Método 1: Scroll inmediato al cargar
        window.scrollTo(0, 0);
        
        // Método 2: Asegurar que se mantenga en top después de que todo cargue
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        };

        // Ejecutar inmediatamente
        scrollToTop();

        // También ejecutar cuando la página termine de cargar completamente
        if (document.readyState === 'loading') {
            window.addEventListener('load', scrollToTop);
        } else {
            // Si la página ya está cargada, ejecutar inmediatamente
            scrollToTop();
        }

        // Cleanup
        return () => {
            window.removeEventListener('load', scrollToTop);
        };
    }, []);

    // También ejecutar cuando el componente se monta
    useEffect(() => {
        // Usar setTimeout para asegurar que se ejecute después del render
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);
}
