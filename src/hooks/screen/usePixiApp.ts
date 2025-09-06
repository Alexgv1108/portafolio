import { useEffect, useRef, useState } from 'react';
import { Application } from 'pixi.js';

export function usePixiApp() {
    const appRef = useRef<Application | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initPixi = async () => {
            // Crear la aplicación de PixiJS
            const app = new Application();
            
            // Inicializar la aplicación
            await app.init({
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundAlpha: 0, // Fondo transparente
                resolution: window.devicePixelRatio || 1
            });

            // Habilitar renderizado automático
            app.ticker.autoStart = true;
            app.ticker.start();
            
            // Agregar función de renderizado continuo con manejo de errores
            const renderLoop = () => {
                try {
                    // Este ticker asegura que PixiJS renderice cada frame
                    app.render();
                } catch (error) {
                    console.warn('Render error caught:', error);
                }
            };
            
            app.ticker.add(renderLoop);

            // Configurar el canvas para renderizado suave
            app.canvas.style.position = 'fixed';
            app.canvas.style.top = '0';
            app.canvas.style.left = '0';
            app.canvas.style.width = '100vw';
            app.canvas.style.height = '100vh';
            app.canvas.style.pointerEvents = 'none';
            app.canvas.style.zIndex = '9999';
            app.canvas.style.imageRendering = 'auto'; // Renderizado suave para imágenes normales

            // Agregar al DOM
            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas);
            } else {
                document.body.appendChild(app.canvas);
            }

            // Manejar redimensionamiento
            const handleResize = () => {
                app.renderer.resize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

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
        };

        initPixi();
    }, []);

    return {
        app: appRef.current,
        isReady,
        containerRef,
    };
}
