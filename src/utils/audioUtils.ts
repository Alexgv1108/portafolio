import { sound } from '@pixi/sound';

/**
 * Reproduce un sonido usando PixiJS Sound
 * @param volume - El volumen de reproducción (0-1)
 */
export function playPixiSound(volume: number = 0.5): void {
    try {
        // Usar PixiJS Sound para reproducir el audio
        sound.play('coin-sound', {
            volume: volume,
            singleInstance: true
        });
    } catch (error) {
        console.warn('Error playing coin sound with PixiJS Sound:', error);
    }
}