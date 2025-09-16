import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { Assets, Sprite } from 'pixi.js';
import { getCharacterDimensions } from '../../constants/characterDimensions';
import { useCharacterStore } from '../stores/useCharacterStore';
import { useAppStore } from '../stores/useAppStore';
import { useModalStore } from '../stores/useModalStore';

export function usePixiSprite() {

    const { appZ, appAddChildToContainer } = useAppStore(
        useShallow((state) => ({
            appZ: state.appZ,
            appAddChildToContainer: state.appAddChildToContainer
        }))
    );

    const { assetsLoaded, setCharacterRef, setPosition, characterRef } = useCharacterStore(
        useShallow((state) => ({
            assetsLoaded: state.assetsLoaded,
            setCharacterRef: state.setCharacterRef,
            setPosition: state.setPosition,
            characterRef: state.characterRef,
        }))
    );

    const { isModalOpen } = useModalStore();

    useEffect(() => {
        if (!appZ || !assetsLoaded) return;

        const idleTexture = Assets.get('character-idle');
        if (!idleTexture) return;

        const character = idleTexture as Sprite & { _textureKey?: string };

        // Habilitar anti-aliasing para mejorar la calidad visual
        if (character.texture && character.texture.source) {
            character.texture.source.scaleMode = 'linear';
        }

        // Configurar posición y propiedades básicas
        const initialX = window.innerWidth / 2;
        const initialY = window.innerHeight / 2;

        character.x = initialX;
        character.y = initialY;

        if (character.anchor) {
            character.anchor.x = 0.5;
            character.anchor.y = 0.5;
        }

        // Escalado mejorado con interpolación suave
        const dimensions = getCharacterDimensions();
        const scale = Math.min(
            dimensions.width / (character.width || dimensions.width),
            dimensions.height / (character.height || dimensions.height)
        );

        if (character.scale) {
            character.scale.x = scale;
            character.scale.y = scale;
        }

        // Mejorar la calidad de renderizado
        character.roundPixels = false;
        character._textureKey = 'character-idle';

        appAddChildToContainer(character);
        setCharacterRef(character);
        setPosition(initialX, initialY);

        return () => {
            if (character.parent) {
                character.parent.removeChild(character);
            }
        };
    }, [appZ, assetsLoaded, appAddChildToContainer, setCharacterRef, setPosition]);

    // Efecto para ocultar/mostrar el personaje cuando hay modales abiertos
    useEffect(() => {
        if (characterRef && typeof characterRef === 'object' && 'visible' in characterRef) {
            (characterRef as { visible: boolean }).visible = !isModalOpen;
        }
    }, [characterRef, isModalOpen]);

}