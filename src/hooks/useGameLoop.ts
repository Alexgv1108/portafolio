import { useCharacterMovement } from "./character/useCharacterMovement";
import { useCharacterPosition } from "./character/useCharacterPosition";
import { useNearBottom } from "./character/useNearBottom";
import { useKeyboardListener } from "./keyboard/useKeyboardListener";

export function useGameLoop() {
    useKeyboardListener();
    useCharacterMovement();
    useCharacterPosition();
    useNearBottom();
}