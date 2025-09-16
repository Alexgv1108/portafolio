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
        const sizeClasses = isMobile ? 'w-14 h-14' : 'w-10 h-10';
        const textClasses = isMobile ? 'text-xl' : 'text-sm';
        
        return `
        ${sizeClasses} flex items-center justify-center rounded-xl
        shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-xl
        ${textClasses} font-bold 
        transition-all duration-300 
        hover:scale-110 hover:shadow-xl hover:shadow-emerald-200/50 dark:hover:shadow-emerald-500/25 hover:cursor-pointer
        active:scale-95 focus:outline-none focus:ring-0
        border border-slate-200/50 dark:border-slate-700/50
        ${isPressed
            ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-emerald-300/50 border-transparent scale-95'
            : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400'
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
            <div className="p-4 rounded-2xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-lg border border-white/20 dark:border-slate-700/30 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40">
                <div className="mb-3 text-center">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Controles
                    </span>
                </div>
                
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
                
                <div className="mt-3 text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                        ESPACIO para interactuar
                    </span>
                </div>
            </div>
        </div>
    );
};
