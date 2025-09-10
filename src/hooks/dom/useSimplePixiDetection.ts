import { useState, useEffect, useRef } from 'react';
import { useCharacterStore } from '../../stores/useCharacterStore';

interface SimpleDetectionProps {
    elementRef: React.RefObject<HTMLElement | null>;
    collisionTolerance?: number;
}

export function useSimplePixiDetection({
    elementRef,
    collisionTolerance = 50
}: SimpleDetectionProps) {
    const [isCharacterOver, setIsCharacterOver] = useState(false);
    const intervalRef = useRef<number | null>(null);
    
    // Obtener datos directamente del store con menos hooks
    const getPosition = useCharacterStore(state => state.getPosition);
    const assetsLoaded = useCharacterStore(state => state.assetsLoaded);

    useEffect(() => {
        if (!assetsLoaded) return;

        const checkCollision = () => {
            if (!elementRef.current) {
                setIsCharacterOver(false);
                return;
            }

            // Obtener posición directamente del store
            const position = getPosition();
            const element = elementRef.current;
            const rect = element.getBoundingClientRect();

            // Convertir posición del personaje a coordenadas DOM
            const canvas = document.querySelector('canvas');
            if (!canvas) return;

            const canvasRect = canvas.getBoundingClientRect();
            const domX = position.x + canvasRect.left;
            const domY = position.y + canvasRect.top;

            // Verificar colisión simple
            const isOver = (
                domX >= rect.left - collisionTolerance &&
                domX <= rect.right + collisionTolerance &&
                domY >= rect.top - collisionTolerance &&
                domY <= rect.bottom + collisionTolerance
            );

            setIsCharacterOver(isOver);
        };

        // Usar setInterval más simple que requestAnimationFrame
        intervalRef.current = setInterval(checkCollision, 50); // 20fps

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [elementRef, collisionTolerance, getPosition, assetsLoaded]);

    return { isCharacterOver };
}
