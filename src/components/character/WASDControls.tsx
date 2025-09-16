import { useShallow } from "zustand/shallow";
import { useKeyboardStore } from "../../hooks/stores/useKeyboardStore";
import { useEffect, useState } from "react";

export const WASDControls = () => {
    const { pressedKeys, pressVirtualKey, releaseVirtualKey } = useKeyboardStore(
        useShallow((state) => ({
            pressedKeys: state.pressedKeys,
            pressVirtualKey: state.pressVirtualKey,
            releaseVirtualKey: state.releaseVirtualKey,
        }))
    );

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const getKeyStyles = (key: string) => {
        const isPressed = pressedKeys.has(key.toLowerCase());
        const sizeClasses = isMobile ? 'w-14 h-14' : 'w-8 h-8';
        const textClasses = isMobile ? 'text-xl' : 'text-sm';
        
        return `
        ${sizeClasses} flex items-center justify-center rounded-xl
        shadow-lg dark:shadow-2xl 
        ${textClasses} font-bold 
        transition-all duration-300 
        hover:scale-110 hover:shadow-xl dark:hover:border-cyan-400 hover:cursor-pointer
        active:scale-95 focus:outline-none focus:ring-0
        ${isPressed
            ? 'bg-gradient-to-br from-cyan-300 to-blue-500 text-white shadow-cyan-300/50 border-transparent'
            : 'bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-cyan-300'
        }
    `;
    };

    // Handlers mejorados para controles virtuales
    const handleVirtualKeyDown = (key: string) => {
        const lowerKey = key.toLowerCase();
        if (!pressedKeys.has(lowerKey)) {
            pressVirtualKey(lowerKey);
        }
    };

    const handleVirtualKeyUp = (key: string) => {
        const lowerKey = key.toLowerCase();
        releaseVirtualKey(lowerKey);
    };

    return (
        <div className={`fixed z-50 select-none ${
            isMobile 
                ? 'bottom-4 left-1/2 -translate-x-1/2' 
                : 'top-4 left-4'
        }`}>
            <div className={`flex flex-col items-center ${isMobile ? 'gap-3' : 'gap-1'}`}>
                {/* W */}
                <div className="flex justify-center">
                    <div 
                        className={getKeyStyles('W')}
                        onMouseDown={() => handleVirtualKeyDown('w')}
                        onMouseUp={() => handleVirtualKeyUp('w')}
                        onMouseLeave={() => handleVirtualKeyUp('w')}
                        onTouchStart={() => handleVirtualKeyDown('w')}
                        onTouchEnd={() => handleVirtualKeyUp('w')}
                    >
                        W
                    </div>
                </div>

                {/* A S D */}
                <div className={`flex ${isMobile ? 'gap-3' : 'gap-1'}`}>
                    {["A", "S", "D"].map((key) => (
                        <div
                            key={key}
                            className={getKeyStyles(key)}
                            onMouseDown={() => handleVirtualKeyDown(key)}
                            onMouseUp={() => handleVirtualKeyUp(key)}
                            onMouseLeave={() => handleVirtualKeyUp(key)}
                            onTouchStart={() => handleVirtualKeyDown(key)}
                            onTouchEnd={() => handleVirtualKeyUp(key)}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
