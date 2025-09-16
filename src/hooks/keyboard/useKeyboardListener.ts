import { useEffect } from "react"
import { useShallow } from "zustand/shallow";
import { useKeyboardStore } from "../../hooks/stores/useKeyboardStore";

export function useKeyboardListener() {
    const { onKeyDown, onKeyUp } = useKeyboardStore(
        useShallow((state) => ({
            onKeyDown: state.onKeyDown,
            onKeyUp: state.onKeyUp,
        }))
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            onKeyDown(e.key)
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            onKeyUp(e.key)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [onKeyDown, onKeyUp])
}