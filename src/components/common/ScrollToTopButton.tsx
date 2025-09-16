import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        const toggleVisibility = () => {
            // Mostrar el botón cuando se haya scrolleado más de 100vh
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className={`fixed z-30 select-none transition-all duration-300 ${
                isMobile 
                    ? 'bottom-32 right-4 w-12 h-12' // Más arriba para evitar conflicto con controles
                    : 'bottom-6 right-6 w-14 h-14'
            } 
            bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600
            text-white rounded-full shadow-lg shadow-emerald-200/50 dark:shadow-emerald-500/25
            hover:scale-110 hover:shadow-xl active:scale-95
            backdrop-blur-sm border border-white/20
            flex items-center justify-center
            animate-fade-in mobile-safe-bottom`}
            aria-label="Volver al inicio"
        >
            <ChevronUp className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'}`} strokeWidth={2} />
        </button>
    );
};
