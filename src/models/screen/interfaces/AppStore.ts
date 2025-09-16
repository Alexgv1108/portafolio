import type { Application, Sprite } from "pixi.js";

export interface AppStore {
    appZ: Application | null;
    container: HTMLDivElement | null;
    isReady: boolean;
    setAppZ: (app: Application) => void;
    appAddChildToContainer: (idleTexture: Sprite & { _textureKey?: string }) => void;
    setContainer: (container: HTMLDivElement | null) => void;
    appendChildToContainer: (child: HTMLCanvasElement) => void;
    setIsReady: (isReady: boolean) => void;
    destroyApp: () => void;
}