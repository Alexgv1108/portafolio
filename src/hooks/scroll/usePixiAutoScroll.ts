import { useCallback, useRef, useEffect, useState } from 'react';
import type { UsePixiAutoScrollProps } from '../../models/character/interfaces/UsePixiAutoScrollProps';
import { 
    AUTO_SCROLL_DISTANCE, 
    AUTO_SCROLL_COOLDOWN,
    AUTO_SCROLL_REPOSITION_DELAY,
    AUTO_SCROLL_REPOSITION_OFFSET,
    getAutoScrollConfig
} from '../../constants/autoScrollConfig';
import { useDisableScroll } from './useDisableScroll';

export function usePixiAutoScroll({ 
    getPosition, 
    moveCharacter,
    threshold: customThreshold, 
    scrollDistance = AUTO_SCROLL_DISTANCE 
}: UsePixiAutoScrollProps) {
    const lastScrollTimeRef = useRef<number>(0);
    const isScrollingRef = useRef<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Detectar dispositivos móviles
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                || window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cooldown más largo en móviles para evitar bugs
    const scrollCooldownMs = isMobile ? AUTO_SCROLL_COOLDOWN * 1.5 : AUTO_SCROLL_COOLDOWN;

    // Deshabilitar scroll manual usando hook personalizado
    useDisableScroll();

    const checkAndScroll = useCallback(() => {
        const currentTime = Date.now();
        
        // Verificar cooldown para evitar scrolls muy frecuentes
        if (currentTime - lastScrollTimeRef.current < scrollCooldownMs || isScrollingRef.current) {
            return;
        }

        // Obtener threshold dinámico si no se proporciona uno custom
        const config = getAutoScrollConfig();
        const threshold = customThreshold || config.threshold;

        const position = getPosition();
        const windowHeight = window.innerHeight;
        const isAtBottom = window.scrollY + windowHeight >= document.documentElement.scrollHeight - 10;
        const isAtTop = window.scrollY <= 10;
        
        // En móviles, usar thresholds más grandes para evitar scrolls accidentales
        const mobileThresholdMultiplier = isMobile ? 1.5 : 1;
        const adjustedThreshold = threshold * mobileThresholdMultiplier;
        
        // Verificar si el personaje está cerca del bottom
        if (!isAtBottom && position.y > windowHeight - adjustedThreshold) {
            lastScrollTimeRef.current = currentTime;
            isScrollingRef.current = true;
            
            // Scroll más suave en móviles
            const scrollAmount = windowHeight * (scrollDistance / (isMobile ? 150 : 100));
            
            window.scrollBy({
                top: scrollAmount,
                behavior: isMobile ? 'auto' : 'smooth' // Auto en móviles para evitar conflictos
            });

            // Reposicionar el personaje al top después del scroll con delay mayor en móviles
            const repositionDelay = isMobile ? AUTO_SCROLL_REPOSITION_DELAY * 2 : AUTO_SCROLL_REPOSITION_DELAY;
            setTimeout(() => {
                const currentPos = getPosition();
                moveCharacter(currentPos.x, adjustedThreshold + AUTO_SCROLL_REPOSITION_OFFSET);
                isScrollingRef.current = false;
            }, repositionDelay);
        }
        // Verificar si el personaje está cerca del top y no estamos en el top de la página
        else if (position.y < adjustedThreshold && !isAtTop) {
            lastScrollTimeRef.current = currentTime;
            isScrollingRef.current = true;
            
            // Scroll más suave en móviles
            const scrollAmount = windowHeight * (scrollDistance / (isMobile ? 150 : 100));
            
            window.scrollBy({
                top: -scrollAmount,
                behavior: isMobile ? 'auto' : 'smooth' // Auto en móviles para evitar conflictos
            });

            // Reposicionar el personaje al bottom después del scroll con delay mayor en móviles
            const repositionDelay = isMobile ? AUTO_SCROLL_REPOSITION_DELAY * 2 : AUTO_SCROLL_REPOSITION_DELAY;
            setTimeout(() => {
                const currentPos = getPosition();
                const newY = windowHeight - adjustedThreshold - AUTO_SCROLL_REPOSITION_OFFSET;
                moveCharacter(currentPos.x, newY);
                isScrollingRef.current = false;
            }, repositionDelay);
        }
    }, [getPosition, moveCharacter, customThreshold, scrollDistance, scrollCooldownMs, isMobile]);

    return { checkAndScroll };
}
