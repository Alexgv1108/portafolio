import { useEffect, useState } from 'react';
import { Assets } from 'pixi.js';
import type { UsePixiAssetsProps } from '../../models/assets/interfaces/UsePixiAssetsProps';

// Importar el parser de GIFs
import '@pixi/gif';

// Usar solo GIFs para todos los estados
import characterImg from '../../assets/character-idle.gif';
import characterUpDown from '../../assets/character-up-down.gif';
import characterImgRight from '../../assets/character-rigth.gif';
import characterImgLeft from '../../assets/character-left.gif';

export function usePixiAssets({ isReady }: UsePixiAssetsProps) {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        if (!isReady) return;

        const loadAssets = async () => {
            try {
                // Cargar todos los GIFs usando Assets.load como indica la documentación
                await Assets.load([
                    { alias: 'character-idle', src: characterImg },
                    { alias: 'character-right', src: characterImgRight },
                    { alias: 'character-left', src: characterImgLeft },
                    { alias: 'character-up-down', src: characterUpDown }
                ]);
                
                setAssetsLoaded(true);
            } catch (error) {
                console.error('Error loading GIF assets:', error);
            }
        };

        loadAssets();
    }, [isReady]);

    return { assetsLoaded };
}
