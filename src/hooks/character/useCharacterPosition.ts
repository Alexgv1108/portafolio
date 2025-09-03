import { useEffect, useRef, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { directionVectors } from "../../constants/directionVectors";
import { useCharacterStore } from "../stores/useCharacterStore";

const SPEED = 400; // px/seg
const SPRITE_WIDTH = 200;
const SPRITE_HEIGHT = 300;

export function useCharacterPosition() {
    const { direction, move } = useCharacterStore(
        useShallow((state) => ({
            isScrolling: state.isScrolling,
            direction: state.direction,
            move: state.move,
        }))
    );

    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);

    const animate = useCallback((time: number) => {
        if (lastTimeRef.current != null) {
            let delta = (time - lastTimeRef.current) / 1000;
            delta = Math.min(delta, 0.05)

            // Vector de movimiento según la dirección
            const [vx, vy] = directionVectors[direction];
            const length = Math.hypot(vx, vy);

            // Calcula desplazamiento proporcional al tiempo
            const dx = length ? (vx / length) * SPEED * delta : 0;
            const dy = length ? (vy / length) * SPEED * delta : 0;

            if (dx !== 0 || dy !== 0) {
                // Obtén posiciones actuales
                const { x, y } = useCharacterStore.getState();

                let nextX = x + dx;
                let nextY = y + dy;

                // Limita al tamaño de la ventana
                const maxX = window.innerWidth - SPRITE_WIDTH;
                const maxY = window.innerHeight - SPRITE_HEIGHT;

                nextX = Math.max(0, Math.min(nextX, maxX));
                nextY = Math.max(0, Math.min(nextY, maxY));

                // Mueve la diferencia real
                move(nextX - x, nextY - y);
            }
        }

        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [direction, move]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animate]);
}