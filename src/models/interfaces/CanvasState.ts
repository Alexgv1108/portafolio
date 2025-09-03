export interface CanvasState {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    setCanvas: (canvas: HTMLCanvasElement) => void;
}