import { useEffect } from "react";
import { useCanvasStore } from "../stores/useCanvasStore";
import { useShallow } from "zustand/shallow";

const globalCanvas = document.createElement("canvas");

export function useFullscreenCanvas() {
    const { setCanvas } = useCanvasStore(
        useShallow((state) => ({
            setCanvas: state.setCanvas,
        }))
    );

    useEffect(() => {
        const canvas = globalCanvas;

        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";
        canvas.style.background = "transparent";

        if (!document.body.contains(canvas)) {
            document.body.appendChild(canvas);
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        setCanvas(canvas);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [setCanvas]);
}
