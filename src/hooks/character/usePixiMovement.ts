import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';
import { Direction } from '../../models/character/enums/Direction';
import { directionVectors } from '../../constants/directionVectors';
import { useKeyboardStore } from '../../hooks/stores/useKeyboardStore';
import { useCharacterStore } from '../stores/useCharacterStore';
import { usePixiAutoScroll } from '../scroll/usePixiAutoScroll';
import { getAutoScrollConfig } from '../../constants/autoScrollConfig';
import type { KeyboardState } from '../../models/keyboard/interfaces/KeyboardState';

const SPEED = 300; // píxeles por segundo
const MAX_DELTA_TIME = 50; // Máximo 50ms por frame

export function usePixiMovement() {
    const { pressedKeys } = useKeyboardStore(
        useShallow((state: KeyboardState) => ({
            pressedKeys: state.pressedKeys,
        }))
    );

    const { characterRef, setDirection, setPosition, getPosition } = useCharacterStore(
        useShallow((state) => ({
            characterRef: state.characterRef,
            setDirection: state.setDirection,
            setPosition: state.setPosition,
            getPosition: state.getPosition,
        }))
    );

    const lastDirectionRef = useRef<Direction>(Direction.Idle);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);

    // Función para mover el personaje usando el store
    const moveCharacter = useCallback((x: number, y: number) => {
        const character = characterRef as unknown as { x?: number; y?: number; destroyed?: boolean };
        if (character && !character.destroyed) {
            try {
                if (character.x !== undefined && character.y !== undefined) {
                    character.x = x;
                    character.y = y;
                }
                setPosition(x, y);
            } catch (e) {
                console.error('Error moving character:', e);
            }
        }
    }, [characterRef, setPosition]);

    // Hook para auto-scroll
    const { checkAndScroll } = usePixiAutoScroll({ getPosition, moveCharacter });

    // Memoizar configuración de auto-scroll para evitar recalcular en cada frame
    const autoScrollConfig = useMemo(() => getAutoScrollConfig(), []);

    // Optimizar cálculo de dirección con mejor lógica para diagonales
    const calculateDirection = useCallback((pressedKeys: Set<string>): Direction => {
        const keyArray = Array.from(pressedKeys);
        
        // Filtrar solo teclas WASD válidas
        const wasdKeys = keyArray.filter(key => ['w', 'a', 's', 'd'].includes(key));
        
        if (wasdKeys.length === 0) {
            return Direction.Idle;
        }

        // Crear flags para cada dirección
        const isUp = wasdKeys.includes('w');
        const isDown = wasdKeys.includes('s');
        const isLeft = wasdKeys.includes('a');
        const isRight = wasdKeys.includes('d');

        // Priorizar movimientos diagonales válidos
        if (isUp && isRight && !isDown && !isLeft) {
            return Direction.UpRight;
        }
        if (isUp && isLeft && !isDown && !isRight) {
            return Direction.UpLeft;
        }
        if (isDown && isRight && !isUp && !isLeft) {
            return Direction.DownRight;
        }
        if (isDown && isLeft && !isUp && !isRight) {
            return Direction.DownLeft;
        }

        // Movimientos cardinales simples (solo si no hay conflictos)
        if (isUp && !isDown) {
            return Direction.Up;
        }
        if (isDown && !isUp) {
            return Direction.Down;
        }
        if (isLeft && !isRight) {
            return Direction.Left;
        }
        if (isRight && !isLeft) {
            return Direction.Right;
        }

        // Si hay teclas conflictivas (ej: W+S o A+D), no mover
        return Direction.Idle;
    }, []);

    // Función de animación usando useRef para evitar recreaciones
    const animateRef = useRef<(currentTime: number) => void>(() => { });

    animateRef.current = useCallback((currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current;
        
        // Evitar deltaTime muy grandes en el primer frame o después de pausas
        const clampedDeltaTime = Math.min(deltaTime, MAX_DELTA_TIME);
        lastTimeRef.current = currentTime;

        // Calcular dirección actual de forma optimizada
        const currentDirection = calculateDirection(pressedKeys as Set<string>);

        // Actualizar dirección solo si cambió
        if (lastDirectionRef.current !== currentDirection) {
            lastDirectionRef.current = currentDirection;
            setDirection(currentDirection);
        }

        // Mover personaje si hay una dirección activa
        if (currentDirection !== Direction.Idle && characterRef) {
            const directionVector = directionVectors[currentDirection];
            if (!directionVector) return;

            const [vx, vy] = directionVector;
            const length = Math.hypot(vx, vy);

            if (length > 0) {
                const currentPos = getPosition();
                const deltaSeconds = clampedDeltaTime / 1000;

                // Calcular nueva posición
                const normalizedVx = vx / length;
                const normalizedVy = vy / length;
                const displacement = SPEED * deltaSeconds;
                
                const newX = currentPos.x + normalizedVx * displacement;
                const newY = currentPos.y + normalizedVy * displacement;

                // Aplicar límites de pantalla usando configuración memoizada
                const boundedX = Math.max(
                    autoScrollConfig.boundaryHorizontal, 
                    Math.min(newX, window.innerWidth - autoScrollConfig.boundaryHorizontal)
                );
                const boundedY = Math.max(
                    autoScrollConfig.boundaryVertical, 
                    Math.min(newY, window.innerHeight - autoScrollConfig.boundaryVertical)
                );

                moveCharacter(boundedX, boundedY);
                checkAndScroll();
            }
        }

        animationRef.current = requestAnimationFrame(() => animateRef.current!(performance.now()));
    }, [calculateDirection, pressedKeys, characterRef, setDirection, getPosition, moveCharacter, checkAndScroll, autoScrollConfig]);

    // Loop de animación wrapper
    const animate = useCallback((currentTime: number) => {
        animateRef.current(currentTime);
    }, []);

    // Iniciar loop de animación solo cuando el personaje esté disponible
    useEffect(() => {
        if (!characterRef) {
            return;
        }

        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [characterRef, animate]);
}
