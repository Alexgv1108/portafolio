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
        const sizeClasses = isMobile ? 'w-12 h-12' : 'w-10 h-10';
        const textClasses = isMobile ? 'text-lg' : 'text-sm';
        
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
        <div className={`fixed z-10 select-none transition-all duration-300 ${
            isMobile 
                ? 'bottom-6 right-4 opacity-90 hover:opacity-100' 
                : 'top-4 left-4'
        }`}>
            <div className={`p-4 rounded-2xl backdrop-blur-lg border shadow-xl ${
                isMobile 
                    ? 'bg-white/15 dark:bg-slate-900/30 border-white/15 dark:border-slate-700/25 shadow-slate-200/15 dark:shadow-slate-900/30'
                    : 'bg-white/20 dark:bg-slate-900/40 border-white/20 dark:border-slate-700/30 shadow-slate-200/20 dark:shadow-slate-900/40'
            }`}>
                <div className="mb-2 text-center">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Controles
                    </span>
                </div>
                
                <div className={`flex flex-col items-center ${isMobile ? 'gap-2' : 'gap-1'}`}>
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
                    <div className={`flex ${isMobile ? 'gap-2' : 'gap-1'}`}>
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
                
                <div className="mt-2 text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                        ESPACIO para interactuar
                    </span>
                </div>
            </div>
        </div>
    );
};
