import type { ReactNode } from "react";
import { Background } from "../common/Background";
import { WASDControls } from '../character/WASDControls';
import { LightAndDarkMode } from "../button/LightAndDarkMode";
import { Footer } from '../landing/Footer';
import { usePixiGame } from '../../hooks/screen/usePixiGame';

const BaseLayout = ({ children }: { children: ReactNode }) => {
    const { containerRef } = usePixiGame();

    return (
        <>
            <Background />
            <div 
                ref={containerRef} 
                className="fixed inset-0 pointer-events-none z-50"
            />
            <WASDControls />
            <LightAndDarkMode />
            <div className='flex flex-col h-full min-h-screen gap-4'>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default BaseLayout;