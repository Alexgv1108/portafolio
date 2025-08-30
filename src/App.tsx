import BaseLayout from "./components/provider/BaseLayout";
import { useToggleTheme } from "./hooks/style/useToggleTheme";
import { useGameLoop } from "./hooks/useGameLoop";
import { AppRouter } from "./router/AppRouter";

export const App = () => {

    useGameLoop();
    useToggleTheme();

    return (
        <>
            <BaseLayout>
                <AppRouter />
            </BaseLayout>
        </>
    );
}