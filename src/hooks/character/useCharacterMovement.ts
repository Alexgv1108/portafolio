import { useEffect, useMemo, useRef } from "react";
import { Direction } from "../../models/enums/Direction";
import { useShallow } from "zustand/shallow";
import { keyToDirection } from "../../constants/keyToDirection";
import { useCharacterStore } from "../stores/useCharacterStore";
import { useKeyboardStore } from "../stores/useKeyboardStore";

export function useCharacterMovement() {
    const lastDirectionRef = useRef<Direction>(Direction.Idle);

    const { pressedKeys } = useKeyboardStore(
        useShallow((state) => ({
            pressedKeys: state.pressedKeys,
        }))
    );

    const { changeDirection } = useCharacterStore(
        useShallow((state) => ({
            changeDirection: state.changeDirection,
        }))
    );

    const currentDirection = useMemo(() => {
        const keyCount = pressedKeys?.size || 0;
        
        if (keyCount === 0 || keyCount > 2) {
            return Direction.Idle;
        }

        const directions = Array.from(pressedKeys)
            .map(key => keyToDirection[key])
            .filter(Boolean);

        if (directions.length === 0) return Direction.Idle;

        // Single direction
        if (directions.length === 1) {
            return directions[0];
        }

        // Diagonal movement - direct mapping for better performance
        const dirSet = new Set(directions);
        
        if (dirSet.has(Direction.Up) && dirSet.has(Direction.Left)) return Direction.UpLeft;
        if (dirSet.has(Direction.Up) && dirSet.has(Direction.Right)) return Direction.UpRight;
        if (dirSet.has(Direction.Down) && dirSet.has(Direction.Left)) return Direction.DownLeft;
        if (dirSet.has(Direction.Down) && dirSet.has(Direction.Right)) return Direction.DownRight;

        return directions[0];
    }, [pressedKeys]);

    useEffect(() => {
        // Only update if direction actually changed
        if (lastDirectionRef.current !== currentDirection) {
            lastDirectionRef.current = currentDirection;
            changeDirection(currentDirection);
        }
    }, [currentDirection, changeDirection]);
}
