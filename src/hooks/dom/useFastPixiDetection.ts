import { useState, useEffect, useCallback, useRef } from 'react';
import { useCharacterStore } from '../stores/useCharacterStore';

interface FastDetectionProps {
    elementRef: React.RefObject<HTMLElement | null>;
    textoIndicador?: string;
    collisionTolerance?: number;
}

export function useFastPixiDetection({
    elementRef,
    textoIndicador = 'Detectado',
    collisionTolerance = 50
}: FastDetectionProps) {
    const [isCharacterOver, setIsCharacterOver] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const lastStateRef = useRef<boolean>(false);
    
    const { position, assetsLoaded, characterRef } = useCharacterStore();

    // Función de detección más directa
    const checkCollisionFast = useCallback(() => {
        if (!assetsLoaded || !characterRef || !elementRef.current) {
            if (lastStateRef.current) {
                setIsCharacterOver(false);
                lastStateRef.current = false;
            }
            return;
        }

        // Obtener posición del canvas
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const canvasRect = canvas.getBoundingClientRect();
        
        // Calcular posición del personaje en DOM
        const charX = position.x + canvasRect.left + window.pageXOffset;
        const charY = position.y + canvasRect.top + window.pageYOffset;

        // Obtener posición del elemento
        const elemRect = elementRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        const scrollLeft = window.pageXOffset;
        
        const elemLeft = elemRect.left + scrollLeft - collisionTolerance;
        const elemRight = elemRect.left + scrollLeft + elemRect.width + collisionTolerance;
        const elemTop = elemRect.top + scrollTop - collisionTolerance;
        const elemBottom = elemRect.top + scrollTop + elemRect.height + collisionTolerance;

        // Verificar colisión
        const isOver = (
            charX >= elemLeft &&
            charX <= elemRight &&
            charY >= elemTop &&
            charY <= elemBottom
        );

        // Solo actualizar si cambió
        if (isOver !== lastStateRef.current) {
            setIsCharacterOver(isOver);
            lastStateRef.current = isOver;
        }
    }, [position, assetsLoaded, characterRef, elementRef, collisionTolerance]);

    // Effect para manejar el intervalo de detección
    useEffect(() => {
        if (!assetsLoaded || !characterRef) {
            return;
        }

        intervalRef.current = setInterval(checkCollisionFast, 100);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [checkCollisionFast, assetsLoaded, characterRef, textoIndicador]);

    return {
        isCharacterOver
    };
}
