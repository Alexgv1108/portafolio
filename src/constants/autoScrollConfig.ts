import { CHARACTER_WIDTH, CHARACTER_HEIGHT, getCharacterDimensions } from './characterDimensions';

// Función para detectar dispositivos móviles
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768;
}

// Función para obtener configuración de auto-scroll responsiva
export function getAutoScrollConfig() {
    const dimensions = getCharacterDimensions();
    const isMobile = isMobileDevice();
    
    // En móviles, usar valores más grandes para evitar bugs
    const mobileMultiplier = isMobile ? 1.5 : 1;
    
    return {
        threshold: (dimensions.height / 2 + 20) * mobileMultiplier,
        boundaryHorizontal: dimensions.width / 2,
        boundaryVertical: dimensions.height / 2,
        boundaryVerticalAutoScroll: Math.max(dimensions.height / 8, 20) * mobileMultiplier
    };
}

// Constantes para el sistema de auto-scroll
export const AUTO_SCROLL_THRESHOLD = CHARACTER_HEIGHT / 2 + 20; // Un poco más que el límite del personaje (145px)
export const AUTO_SCROLL_DISTANCE = 100; // Distancia de scroll en vh
export const AUTO_SCROLL_COOLDOWN = 1000; // Tiempo de espera entre scrolls en ms (será multiplicado por 1.5 en móviles)
export const AUTO_SCROLL_REPOSITION_DELAY = 50; // Tiempo de espera para reposicionar el personaje (será multiplicado por 2 en móviles)
export const AUTO_SCROLL_REPOSITION_OFFSET = 50; // Offset desde el borde al reposicionar

// Límites de movimiento del personaje (basados en sus dimensiones reales)
// El personaje tiene anchor en 0.5, por lo que necesitamos la mitad del ancho/alto como margen
export const CHARACTER_BOUNDARY_HORIZONTAL = CHARACTER_WIDTH / 2; // Límites izquierda/derecha
export const CHARACTER_BOUNDARY_VERTICAL = CHARACTER_HEIGHT / 2; // Límites arriba/abajo

// Límites especiales para auto-scroll (más permisivos verticalmente)
export const CHARACTER_BOUNDARY_VERTICAL_AUTOSCROLL = Math.max(CHARACTER_HEIGHT / 8, 20); // Más flexible para auto-scroll
