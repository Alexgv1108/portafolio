import type { ReactNode } from "react";
import { Background } from "../common/Background";
import { WASDControls } from '../character/WASDControls';
import { LightAndDarkMode } from "../button/LightAndDarkMode";
import { Footer } from '../landing/Footer';
import { useFullscreenCanvas } from "../../hooks/screen/useFullscreenCanvas";
import { useCharacterPosition } from "../../hooks/character/useCharacterPosition";
import { useDrawCharacter } from "../../hooks/character/useDrawCharacter";

const SPRITE_WIDTH = 200;
const SPRITE_HEIGHT = 300;

const BaseLayout = ({ children }: { children: ReactNode }) => {

    useFullscreenCanvas();
    useCharacterPosition();

    useDrawCharacter({
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
        clear: true,
    });

    return (
        <>
            <Background />
            <WASDControls />
            <LightAndDarkMode />
            <div className="relative w-full min-h-screen block justify-center overflow-hidden pt-10">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default BaseLayout;