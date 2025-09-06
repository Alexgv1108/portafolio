import { useEffect, useRef, useCallback } from 'react';
import { Direction } from '../../models/character/enums/Direction';
import { directionVectors } from '../../constants/directionVectors';
import { keyToDirection } from '../../constants/keyToDirection';
import { useKeyboardStore } from '../stores/useKeyboardStore';
import { useShallow } from 'zustand/shallow';
import type { UsePixiMovementProps } from '../../models/character/interfaces/UsePixiMovementProps';
import { usePixiAutoScroll } from '../scroll/usePixiAutoScroll';
import { getAutoScrollConfig } from '../../constants/autoScrollConfig';

const SPEED = 300; // píxeles por segundo

export function usePixiMovement({ 
    character, 
    setDirection, 
    moveCharacter, 
    getPosition 
}: UsePixiMovementProps) {
    const { pressedKeys } = useKeyboardStore(
        useShallow((state) => ({
            pressedKeys: state.pressedKeys,
        }))
    );

    const lastDirectionRef = useRef<Direction>(Direction.Idle);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);

    // Hook para auto-scroll
    const { checkAndScroll } = usePixiAutoScroll({ getPosition, moveCharacter });

    // Loop de animación para movimiento suave
    const animate = useCallback((currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        // Calcular dirección actual
        const keyCount = pressedKeys?.size || 0;
        let currentDirection = Direction.Idle;
        
        if (keyCount > 0 && keyCount <= 2) {
            const directions = Array.from(pressedKeys)
                .map(key => keyToDirection[key])
                .filter(Boolean);

            if (directions.length === 1) {
                currentDirection = directions[0];
            } else if (directions.length === 2) {
                const dirSet = new Set(directions);
                
                if (dirSet.has(Direction.Up) && dirSet.has(Direction.Right)) {
                    currentDirection = Direction.UpRight;
                } else if (dirSet.has(Direction.Down) && dirSet.has(Direction.Right)) {
                    currentDirection = Direction.DownRight;
                } else if (dirSet.has(Direction.Up) && dirSet.has(Direction.Left)) {
                    currentDirection = Direction.UpLeft;
                } else if (dirSet.has(Direction.Down) && dirSet.has(Direction.Left)) {
                    currentDirection = Direction.DownLeft;
                } else {
                    currentDirection = directions[0];
                }
            }
        }

        // Actualizar dirección si cambió
        if (lastDirectionRef.current !== currentDirection) {
            lastDirectionRef.current = currentDirection;
            setDirection(currentDirection);
        }

        // Mover personaje si hay una dirección activa
        if (currentDirection !== Direction.Idle && character) {
            const [vx, vy] = directionVectors[currentDirection] || [0, 0];
            const length = Math.hypot(vx, vy);

            if (length > 0) {
                const currentPos = getPosition();
                const deltaSeconds = deltaTime / 1000;
                
                // Calcular nueva posición
                const newX = currentPos.x + (vx / length) * SPEED * deltaSeconds;
                const newY = currentPos.y + (vy / length) * SPEED * deltaSeconds;

                // Obtener límites dinámicos
                const config = getAutoScrollConfig();
                
                // Aplicar límites de pantalla
                const boundedX = Math.max(config.boundaryHorizontal, Math.min(newX, window.innerWidth - config.boundaryHorizontal));
                // Límites verticales respetando las dimensiones del personaje
                const boundedY = Math.max(config.boundaryVertical, Math.min(newY, window.innerHeight - config.boundaryVertical));

                moveCharacter(boundedX, boundedY);
                
                // Verificar si necesitamos hacer scroll automático
                checkAndScroll();
            }
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [character, setDirection, getPosition, moveCharacter, pressedKeys, checkAndScroll]);

    // Iniciar loop de animación
    useEffect(() => {
        if (!character) return;

        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate, character]);

    return {
        currentDirection: lastDirectionRef.current,
    };
}
