import { useEffect, useCallback } from 'react';
import { Application } from 'pixi.js';
import { useAppStore } from '../stores/useAppStore';
import { useShallow } from 'zustand/shallow';

export function usePixiApp() {
    const { appZ, container, isReady, setAppZ, appendChildToContainer, setIsReady, destroyApp } = useAppStore(
        useShallow((state) => ({
            appZ: state.appZ,
            container: state.container,
            isReady: state.isReady,
            setAppZ: state.setAppZ,
            appendChildToContainer: state.appendChildToContainer,
            setIsReady: state.setIsReady,
            destroyApp: state.destroyApp,
        }))
    );

    const initPixi = useCallback(async () => {
        try {
            // Crear la aplicación de PixiJS
            const app = new Application();

            // Inicializar la aplicación con configuración optimizada para calidad
            await app.init({
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundAlpha: 0,
                resolution: window.devicePixelRatio || 1,
                antialias: true,
                autoDensity: true,
                powerPreference: 'high-performance'
            });

            // Habilitar renderizado automático
            app.ticker.autoStart = true;
            app.ticker.start();

            // Configurar el canvas para renderizado suave y de alta calidad
            app.canvas.style.position = 'fixed';
            app.canvas.style.top = '0';
            app.canvas.style.left = '0';
            app.canvas.style.width = '100vw';
            app.canvas.style.height = '100vh';
            app.canvas.style.pointerEvents = 'none';
            app.canvas.style.zIndex = '9999';
            app.canvas.style.imageRendering = 'auto';

            // Guardar referencia del canvas
            setAppZ(app);
            setIsReady(true);

            // Cleanup
            return () => {
                destroyApp();
                if (app.canvas.parentNode) {
                    app.canvas.parentNode.removeChild(app.canvas);
                }
                app.destroy();
            };
        } catch (error) {
            console.error('usePixiApp - Error:', error);
        }
    }, [setAppZ, setIsReady, destroyApp]);

    useEffect(() => {
        initPixi();
    }, [initPixi]);

    // Efecto separado para agregar el canvas al container cuando esté listo
    useEffect(() => {
        if (isReady && appZ && container) {
            const app = appZ;
            if (!app.canvas.parentNode) {
                appendChildToContainer(app.canvas);
            }
        }
    }, [isReady, appZ, container, appendChildToContainer]);
}