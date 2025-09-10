import { useEffect, useRef, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';
import { Direction } from '../../models/character/enums/Direction';
import { directionVectors } from '../../constants/directionVectors';
import { keyToDirection } from '../../constants/keyToDirection';
import { useKeyboardStore } from '../../stores/useKeyboardStore';
import { useCharacterStore } from '../../stores/useCharacterStore';
import { usePixiAutoScroll } from '../scroll/usePixiAutoScroll';
import { getAutoScrollConfig } from '../../constants/autoScrollConfig';
import type { KeyboardState } from '../../models/keyboard/interfaces/KeyboardState';

const SPEED = 300; // píxeles por segundo

export function usePixiMovement() {
    const { pressedKeys } = useKeyboardStore(
        useShallow((state: KeyboardState) => ({
            pressedKeys: state.pressedKeys,
        }))
    );

    const { 
        characterRef, 
        setDirection, 
        setPosition, 
        getPosition 
    } = useCharacterStore(
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

    // Refs para acceder a valores actuales sin recrear el loop
    const stateRef = useRef({
        characterRef,
        setDirection,
        getPosition,
        moveCharacter,
        pressedKeys,
        checkAndScroll
    });

    stateRef.current = {
        characterRef,
        setDirection,
        getPosition,
        moveCharacter,
        pressedKeys,
        checkAndScroll
    };

    // Función de animación usando useRef para evitar recreaciones
    const animateRef = useRef<(currentTime: number) => void>(() => {});
    
    animateRef.current = (currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current;
        
        // Evitar deltaTime muy grandes en el primer frame o después de pausas
        const clampedDeltaTime = Math.min(deltaTime, 50); // Máximo 50ms por frame
        lastTimeRef.current = currentTime;

        const { 
            characterRef: currentCharacterRef, 
            setDirection: currentSetDirection,
            getPosition: currentGetPosition,
            moveCharacter: currentMoveCharacter,
            pressedKeys: currentPressedKeys,
            checkAndScroll: currentCheckAndScroll
        } = stateRef.current;

        // Calcular dirección actual
        const keyCount = currentPressedKeys?.size || 0;
        let currentDirection = Direction.Idle;
        
        if (keyCount > 0 && keyCount <= 2) {
            const directions = Array.from(currentPressedKeys as Set<string>)
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
            currentSetDirection(currentDirection);
        }

        // Mover personaje si hay una dirección activa
        if (currentDirection !== Direction.Idle && currentCharacterRef) {
            const [vx, vy] = directionVectors[currentDirection] || [0, 0];
            const length = Math.hypot(vx, vy);

            if (length > 0) {
                const currentPos = currentGetPosition();
                const deltaSeconds = clampedDeltaTime / 1000;
                
                // Calcular nueva posición
                const newX = currentPos.x + (vx / length) * SPEED * deltaSeconds;
                const newY = currentPos.y + (vy / length) * SPEED * deltaSeconds;


                // Obtener límites dinámicos
                const config = getAutoScrollConfig();
                
                // Aplicar límites de pantalla
                const boundedX = Math.max(config.boundaryHorizontal, Math.min(newX, window.innerWidth - config.boundaryHorizontal));
                // Límites verticales respetando las dimensiones del personaje
                const boundedY = Math.max(config.boundaryVertical, Math.min(newY, window.innerHeight - config.boundaryVertical));

                currentMoveCharacter(boundedX, boundedY);
                
                // Verificar si necesitamos hacer scroll automático
                currentCheckAndScroll();
            }
        }

        animationRef.current = requestAnimationFrame(() => animateRef.current!(performance.now()));
    };

    // Loop de animación wrapper
    const animate = useCallback((currentTime: number) => {
        animateRef.current!(currentTime);
    }, []); // Sin dependencias

    // Iniciar loop de animación solo cuando el personaje esté disponible
    useEffect(() => {
        if (!characterRef) {
            return;
        }

        lastTimeRef.current = performance.now();
        const startLoop = () => {
            animationRef.current = requestAnimationFrame(animate);
        };

        startLoop();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [characterRef, animate]);

    return {
        currentDirection: lastDirectionRef.current,
    };
}
