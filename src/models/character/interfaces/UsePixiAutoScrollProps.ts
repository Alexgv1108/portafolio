export interface UsePixiAutoScrollProps {
    getPosition: () => { x: number; y: number };
    moveCharacter: (x: number, y: number) => void;
    threshold?: number; // Distancia desde el borde para activar el scroll
    scrollDistance?: number; // Distancia de scroll en vh
}
