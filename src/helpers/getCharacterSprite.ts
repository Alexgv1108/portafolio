import { Direction } from "../models/enums/Direction";

import characterImg from "../assets/character.png";
import characterImgRight from "../assets/character-rigth.png";
import characterImgLeft from "../assets/character-left.png";

// Cache de imágenes para optimización
class SpriteCache {
    private static instance: SpriteCache;
    private imageCache = new Map<string, HTMLImageElement>();
    private loadingPromises = new Map<string, Promise<HTMLImageElement>>();
    private allLoaded = false;

    static getInstance(): SpriteCache {
        if (!SpriteCache.instance) {
            SpriteCache.instance = new SpriteCache();
        }
        return SpriteCache.instance;
    }

    private constructor() {
        this.preloadImages();
    }

    private preloadImages(): void {
        const sprites = [
            { key: 'default', src: characterImg },
            { key: 'right', src: characterImgRight },
            { key: 'left', src: characterImgLeft },
        ];

        const loadPromises = sprites.map(sprite => this.loadImage(sprite.key, sprite.src));
        
        Promise.all(loadPromises).then(() => {
            this.allLoaded = true;
            console.log('All character sprites loaded and cached');
        }).catch(error => {
            console.error('Error loading character sprites:', error);
        });
    }

    private loadImage(key: string, src: string): Promise<HTMLImageElement> {
        if (this.imageCache.has(key)) {
            return Promise.resolve(this.imageCache.get(key)!);
        }

        if (this.loadingPromises.has(key)) {
            return this.loadingPromises.get(key)!;
        }

        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.imageCache.set(key, img);
                this.loadingPromises.delete(key);
                resolve(img);
            };
            img.onerror = () => {
                this.loadingPromises.delete(key);
                reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
        });

        this.loadingPromises.set(key, promise);
        return promise;
    }

    getSprite(direction: Direction): string {
        switch (direction) {
            case Direction.Left:
            case Direction.UpLeft:
            case Direction.DownLeft:
                return characterImgLeft;
            case Direction.Right:
            case Direction.UpRight:
            case Direction.DownRight:
                return characterImgRight;
            default:
                return characterImg;
        }
    }

    getCachedImage(direction: Direction): HTMLImageElement | null {
        switch (direction) {
            case Direction.Left:
            case Direction.UpLeft:
            case Direction.DownLeft:
                return this.imageCache.get('left') || null;
            case Direction.Right:
            case Direction.UpRight:
            case Direction.DownRight:
                return this.imageCache.get('right') || null;
            default:
                return this.imageCache.get('default') || null;
        }
    }

    areAllSpritesLoaded(): boolean {
        return this.allLoaded;
    }

    waitForAllSprites(): Promise<void> {
        if (this.allLoaded) {
            return Promise.resolve();
        }

        return Promise.all(Array.from(this.loadingPromises.values())).then(() => {
            this.allLoaded = true;
        });
    }
}

// Instancia singleton del cache
const spriteCache = SpriteCache.getInstance();

export function getCharacterSprite(direction: Direction): string {
    return spriteCache.getSprite(direction);
}

export function getCachedCharacterImage(direction: Direction): HTMLImageElement | null {
    return spriteCache.getCachedImage(direction);
}

export function areAllSpritesLoaded(): boolean {
    return spriteCache.areAllSpritesLoaded();
}

export function waitForAllSprites(): Promise<void> {
    return spriteCache.waitForAllSprites();
}