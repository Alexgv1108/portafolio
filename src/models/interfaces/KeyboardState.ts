export interface KeyboardState {
    lastKey?: string;
    pressedKeys: Set<string>;
    onKeyDown: (key: string) => void;
    onKeyUp: (key: string) => void;
    isKeyPressed: (key: string) => boolean;
    pressVirtualKey: (key: string) => void;
    releaseVirtualKey: (key: string) => void;
}