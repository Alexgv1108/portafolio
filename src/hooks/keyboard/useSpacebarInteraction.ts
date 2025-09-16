import { useEffect, useCallback } from "react";
import type { UseSpacebarInteractionProps } from "../../models/keyboard/interfaces/UseSpacebarInteractionProps";

export function useSpacebarInteraction({ isActive, onInteraction }: UseSpacebarInteractionProps) {
    const handleKeyDownCapture = useCallback((event: KeyboardEvent) => {
        if (isActive && event.code === 'Space') {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            onInteraction();
        }
    }, [isActive, onInteraction]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDownCapture, { capture: true });
        return () => {
            window.removeEventListener('keydown', handleKeyDownCapture, { capture: true });
        };
    }, [handleKeyDownCapture, isActive]);

    return {
        isSpacebarEnabled: isActive
    };
}
