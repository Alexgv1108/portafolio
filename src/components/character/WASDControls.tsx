import { useShallow } from "zustand/shallow";
import { useKeyboardStore } from "../../hooks/stores/useKeyboardStore";

export const WASDControls = () => {
    const { pressedKeys, pressVirtualKey, releaseVirtualKey } = useKeyboardStore(
        useShallow((state) => ({
            pressedKeys: state.pressedKeys,
            pressVirtualKey: state.pressVirtualKey,
            releaseVirtualKey: state.releaseVirtualKey,
        }))
    );

    const getKeyStyles = (key: string) => {
        const isPressed = pressedKeys.has(key.toLowerCase());
        return `
        w-14 h-14 flex items-center justify-center rounded-xl
        shadow-lg dark:shadow-2xl 
        text-xl font-bold 
        transition-all duration-300 
        hover:scale-110 hover:shadow-xl dark:hover:border-yellow-400 hover:cursor-pointer
        active:scale-95 focus:outline-none focus:ring-0
        ${isPressed
            ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 shadow-yellow-300/50 border-transparent'
            : 'bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-yellow-300'
        }
    `;
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 select-none">
            <div className="flex flex-col items-center gap-3">
                {/* W */}
                <div className="flex justify-center">
                    <div 
                        className={getKeyStyles('W')}
                        onMouseDown={() => pressVirtualKey('w')}
                        onMouseUp={() => releaseVirtualKey('w')}
                        onMouseLeave={() => releaseVirtualKey('w')}
                        onTouchStart={() => pressVirtualKey('w')}
                        onTouchEnd={() => releaseVirtualKey('w')}
                    >
                        W
                    </div>
                </div>

                {/* A S D */}
                <div className="flex gap-3">
                    {["A", "S", "D"].map((key) => (
                        <div
                            key={key}
                            className={getKeyStyles(key)}
                            onMouseDown={() => pressVirtualKey(key.toLowerCase())}
                            onMouseUp={() => releaseVirtualKey(key.toLowerCase())}
                            onMouseLeave={() => releaseVirtualKey(key.toLowerCase())}
                            onTouchStart={() => pressVirtualKey(key.toLowerCase())}
                            onTouchEnd={() => releaseVirtualKey(key.toLowerCase())}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
