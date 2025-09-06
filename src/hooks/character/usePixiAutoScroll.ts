import { useCallback, useRef } from 'react';
import type { UsePixiAutoScrollProps } from '../../models/character/interfaces/UsePixiAutoScrollProps';
import { 
    AUTO_SCROLL_DISTANCE, 
    AUTO_SCROLL_COOLDOWN,
    AUTO_SCROLL_REPOSITION_DELAY,
    AUTO_SCROLL_REPOSITION_OFFSET,
    getAutoScrollConfig
} from '../../constants/autoScrollConfig';

export function usePixiAutoScroll({ 
    getPosition, 
    moveCharacter,
    threshold: customThreshold, 
    scrollDistance = AUTO_SCROLL_DISTANCE 
}: UsePixiAutoScrollProps) {
    const lastScrollTimeRef = useRef<number>(0);
    const scrollCooldownMs = AUTO_SCROLL_COOLDOWN;

    const checkAndScroll = useCallback(() => {
        const currentTime = Date.now();
        
        // Verificar cooldown para evitar scrolls muy frecuentes
        if (currentTime - lastScrollTimeRef.current < scrollCooldownMs) {
            return;
        }

        // Obtener threshold dinámico si no se proporciona uno custom
        const config = getAutoScrollConfig();
        const threshold = customThreshold || config.threshold;

        const position = getPosition();
        const windowHeight = window.innerHeight;
        const isAtBottom = window.scrollY + windowHeight >= document.documentElement.scrollHeight - 10;
        const isAtTop = window.scrollY <= 10;
        
        // Verificar si el personaje está cerca del bottom
        if (!isAtBottom && position.y > windowHeight - threshold) {
            lastScrollTimeRef.current = currentTime;
            
            // Scroll hacia abajo
            const scrollAmount = windowHeight * (scrollDistance / 100);
            window.scrollBy({
                top: scrollAmount,
                behavior: 'smooth'
            });

            // Reposicionar el personaje al top después del scroll
            setTimeout(() => {
                const currentPos = getPosition();
                moveCharacter(currentPos.x, threshold + AUTO_SCROLL_REPOSITION_OFFSET);
            }, AUTO_SCROLL_REPOSITION_DELAY);
        }
        // Verificar si el personaje está cerca del top y no estamos en el top de la página
        else if (position.y < threshold && !isAtTop) {
            lastScrollTimeRef.current = currentTime;
            
            // Scroll hacia arriba
            const scrollAmount = windowHeight * (scrollDistance / 100);
            window.scrollBy({
                top: -scrollAmount,
                behavior: 'smooth'
            });

            // Reposicionar el personaje al bottom después del scroll
            setTimeout(() => {
                const currentPos = getPosition();
                const newY = windowHeight - threshold - AUTO_SCROLL_REPOSITION_OFFSET;
                moveCharacter(currentPos.x, newY);
            }, AUTO_SCROLL_REPOSITION_DELAY);
        }
    }, [getPosition, moveCharacter, customThreshold, scrollDistance, scrollCooldownMs]);

    return { checkAndScroll };
}
