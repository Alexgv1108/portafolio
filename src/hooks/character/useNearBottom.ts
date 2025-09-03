import { useState, useEffect } from "react";
import { useCharacterStore } from "../stores/useCharacterStore";
import { useShallow } from "zustand/shallow";

const SPRITE_HEIGHT = 250;
const SCROLL_STEP = 2;

export const useNearBottom = () => {
    const threshold = 50;
    const { x, y, setIsScrolling, setPosition } = useCharacterStore(
        useShallow((state) => ({
            x: state.x,
            y: state.y,
            setIsScrolling: state.setIsScrolling,
            setPosition: state.setPosition,
        }))
    );

    const [isNearBottom, setIsNearBottom] = useState(false);

    useEffect(() => {
        const handleCheck = () => {
            const windowHeight = window.innerHeight;
            if (y + SPRITE_HEIGHT >= windowHeight - threshold) {
                setIsNearBottom(true);
                setIsScrolling(true);
            } else {
                setIsNearBottom(false);
                setIsScrolling(false);
            }
        };

        handleCheck();
    }, [y, setIsScrolling]);

    useEffect(() => {
        if (!isNearBottom) return;

        let animationFrameId: number;

        const scrollStep = () => {
            window.scrollBy({ top: SCROLL_STEP, behavior: "auto" });
            setPosition(x, y + SCROLL_STEP);
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        animationFrameId = requestAnimationFrame(scrollStep);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isNearBottom, x, y, setPosition]);

    return isNearBottom;
};
