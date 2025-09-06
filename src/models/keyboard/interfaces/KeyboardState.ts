export interface KeyboardState {
    lastKey?: string;
    pressedKeys: Set<string>;
    setLastKey: (key: string) => void;
    onKeyDown: (key: string) => void;
    onKeyUp: (key: string) => void;
    isKeyPressed: (key: string) => boolean;
    pressVirtualKey: (key: string) => void;
    releaseVirtualKey: (key: string) => void;
}