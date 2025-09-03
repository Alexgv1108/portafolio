import { useEffect, useRef, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { directionVectors } from "../../constants/directionVectors";
import { useCharacterStore } from "../stores/useCharacterStore";
import { Direction } from "../../models/enums/Direction";

const SPEED = 600; // px/seg
const SPRITE_WIDTH = 200;
const SPRITE_HEIGHT = 300;
const MAX_DELTA = 1/30; // Máximo delta para evitar saltos

export function useCharacterPosition() {
    const { direction, updateVelocity, setPosition, velocityX, velocityY } = useCharacterStore(
        useShallow((state) => ({
            direction: state.direction,
            updateVelocity: state.updateVelocity,
            setPosition: state.setPosition,
            velocityX: state.velocityX,
            velocityY: state.velocityY,
        }))
    );

    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);

    const animate = useCallback((time: number) => {
        // Calcular delta time
        const delta = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, MAX_DELTA) : 0;
        lastTimeRef.current = time;

        if (direction !== Direction.Idle) {
            // Vector de movimiento según la dirección
            const [vx, vy] = directionVectors[direction] || [0, 0];
            const length = Math.hypot(vx, vy);

            if (length > 0) {
                // Velocidad normalizada - aplicar directamente
                const targetVx = (vx / length) * SPEED;
                const targetVy = (vy / length) * SPEED;

                // Actualizar velocidad directamente
                updateVelocity(targetVx, targetVy);
            }
        } else {
            // Detener inmediatamente cuando no hay dirección
            updateVelocity(0, 0);
        }

        // Aplicar velocidad a la posición inmediatamente
        if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
            const state = useCharacterStore.getState();
            
            // Calcular nueva posición
            const newX = state.x + velocityX * delta;
            const newY = state.y + velocityY * delta;

            // Aplicar límites
            const maxX = window.innerWidth - SPRITE_WIDTH;
            const maxY = window.innerHeight - SPRITE_HEIGHT;
            
            const clampedX = Math.max(0, Math.min(newX, maxX));
            const clampedY = Math.max(0, Math.min(newY, maxY));

            setPosition(clampedX, clampedY);
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [direction, updateVelocity, setPosition, velocityX, velocityY]);

    useEffect(() => {
        lastTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animate]);
}