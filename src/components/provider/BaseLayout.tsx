import type { ReactNode } from "react";
import { NavBar } from "../common/NavBar";
import { Background } from "../common/Background";
import { Character } from "../character/Character";
import { WASDControls } from '../character/WASDControls';

const BaseLayout = ({ children }: { children: ReactNode }) => {

    return (
        <>
            <Background />
            <Character />
            <WASDControls />
            <NavBar />
            {children}
        </>
    );
};

export default BaseLayout;