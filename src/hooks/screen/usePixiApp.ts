import { useEffect, useRef, useState } from 'react';
import { Application } from 'pixi.js';

export function usePixiApp() {
    const appRef = useRef<Application | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initPixi = async () => {
            try {
                // Crear la aplicación de PixiJS
                const app = new Application();
            
                // Inicializar la aplicación
                await app.init({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    backgroundAlpha: 0,
                    resolution: window.devicePixelRatio || 1
                });

                // Habilitar renderizado automático
                app.ticker.autoStart = true;
                app.ticker.start();

                // Configurar el canvas para renderizado suave
                app.canvas.style.position = 'fixed';
                app.canvas.style.top = '0';
                app.canvas.style.left = '0';
                app.canvas.style.width = '100vw';
                app.canvas.style.height = '100vh';
                app.canvas.style.pointerEvents = 'none';
                app.canvas.style.zIndex = '9999';
                app.canvas.style.imageRendering = 'auto';

                // Manejar redimensionamiento
                const handleResize = () => {
                    app.renderer.resize(window.innerWidth, window.innerHeight);
                };

                window.addEventListener('resize', handleResize);

                // Guardar referencia del canvas
                appRef.current = app;
                setIsReady(true);

                // Cleanup
                return () => {
                    window.removeEventListener('resize', handleResize);
                    if (app.canvas.parentNode) {
                        app.canvas.parentNode.removeChild(app.canvas);
                    }
                    app.destroy();
                };
            } catch (error) {
                console.error('usePixiApp - Error:', error);
            }
        };

        initPixi();
    }, []);

    // Efecto separado para agregar el canvas al container cuando esté listo
    useEffect(() => {
        if (isReady && appRef.current && containerRef.current) {
            const app = appRef.current;
            if (!app.canvas.parentNode) {
                containerRef.current.appendChild(app.canvas);
            }
        }
    }, [isReady]);

    return {
        app: appRef.current,
        isReady,
        containerRef,
    };
}
