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
            // Prevenir la repetición de keydown cuando la tecla ya está presionada
            if (e.repeat) return;
            onKeyDown(e.key.toLowerCase());
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            onKeyUp(e.key.toLowerCase());
        }

        // Manejar pérdida de foco para limpiar teclas presionadas
        const handleBlur = () => {
            // Limpiar todas las teclas cuando se pierde el foco
            const store = useKeyboardStore.getState();
            store.pressedKeys.forEach(key => {
                onKeyUp(key);
            });
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleBlur);
        }
    }, [onKeyDown, onKeyUp])
}