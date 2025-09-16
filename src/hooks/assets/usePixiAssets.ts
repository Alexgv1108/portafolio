import { useEffect } from 'react';
import { Assets } from 'pixi.js';
import '@pixi/gif';
import '@pixi/sound';

import characterImg from 'assets/character-idle.gif';
import characterUpDown from 'assets/character-up-down.gif';
import characterImgRight from 'assets/character-rigth.gif';
import characterImgLeft from 'assets/character-left.gif';
import coinSound from '/sounds/coin.mp3';
import { useAppStore } from '../stores/useAppStore';
import { useCharacterStore } from '../stores/useCharacterStore';
import { useShallow } from 'zustand/shallow';

export function usePixiAssets() {

    const { isReady } = useAppStore(
        useShallow((state) => ({
            isReady: state.isReady,
        }))
    );

    const { setAssetsLoaded } = useCharacterStore(
        useShallow((state) => ({
            setAssetsLoaded: state.setAssetsLoaded,
        }))
    );

    useEffect(() => {
        if (!isReady) return;

        const loadAssets = async () => {
            try {
                // Cargar todos los GIFs y sonidos usando Assets.load
                await Assets.load([
                    { alias: 'character-idle', src: characterImg },
                    { alias: 'character-right', src: characterImgRight },
                    { alias: 'character-left', src: characterImgLeft },
                    { alias: 'character-up-down', src: characterUpDown },
                    { alias: 'coin-sound', src: coinSound }
                ]);

                setAssetsLoaded(true);
            } catch (error) {
                console.error('❌ Error loading GIF assets:', error);
            }
        };

        loadAssets();
    }, [isReady, setAssetsLoaded]);
}