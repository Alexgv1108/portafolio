import type { ReactNode } from "react";
import { Background } from "../common/Background";
import { WASDControls } from '../character/WASDControls';
import { LightAndDarkMode } from "../button/LightAndDarkMode";
import { Footer } from '../landing/Footer';

const BaseLayout = ({ children }: { children: ReactNode }) => {

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