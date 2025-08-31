import { useState, useEffect } from "react";
import { useCharacterStore } from "../stores/useCharacterStore";
import { useShallow } from "zustand/shallow";

const SPRITE_HEIGHT = 250;
const SCROLL_STEP = 2;

export const useNearBottom = () => {
    const threshold = 50;
    const { y, setIsScrolling } = useCharacterStore(
        useShallow((state) => ({
            y: state.y,
            setIsScrolling: state.setIsScrolling,
        }))
    );

    const setY = useCharacterStore((state) => state.setY);
    const [isNearBottom, setIsNearBottom] = useState(false);

    useEffect(() => {
        const handleCheck = () => {
            const windowHeight = window.innerHeight;
            if (y + SPRITE_HEIGHT >= windowHeight - threshold) {
                setIsNearBottom(true);
                setIsScrolling(true);
            } else {
                setIsNearBottom(false);
            }
        };

        handleCheck();
    }, [y, setIsScrolling]);

    useEffect(() => {
        if (!isNearBottom) return;

        let animationFrameId: number;

        const scrollStep = () => {
            window.scrollBy({ top: SCROLL_STEP, behavior: "auto" });
            setY(y + SCROLL_STEP);
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        animationFrameId = requestAnimationFrame(scrollStep);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isNearBottom, y, setY]);

    return isNearBottom;
};
