// Función para calcular dimensiones responsivas del personaje
export function getCharacterDimensions() {
    // Proporción original: 1024x1536
    const BASE_HEIGHT = 250;
    const SCALE_FACTOR = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1);
    
    const height = Math.max(150, BASE_HEIGHT * SCALE_FACTOR); // Mínimo 150px
    const width = Math.round((1024 / 1536) * height);
    
    return { width, height };
}

// Valores iniciales para compatibilidad
const initialDimensions = getCharacterDimensions();
export const CHARACTER_HEIGHT = initialDimensions.height;
export const CHARACTER_WIDTH = initialDimensions.width;

// Ratio de aspecto para cálculos
export const CHARACTER_ASPECT_RATIO = 1024 / 1536;
