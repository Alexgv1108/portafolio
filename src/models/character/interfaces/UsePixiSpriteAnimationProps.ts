import { Application } from 'pixi.js';

export interface UsePixiSpriteAnimationProps {
    app: Application | null;
    assetsLoaded: boolean;
    characterRef: React.RefObject<unknown>;
}
