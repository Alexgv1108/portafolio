import BaseLayout from "./components/provider/BaseLayout";
import { useToggleTheme } from "./hooks/style/useToggleTheme";
import { usePixiGame } from "./hooks/screen/usePixiGame";
import { AppRouter } from "./router/AppRouter";

export const App = () => {

    usePixiGame();
    useToggleTheme();

    return (
        <>
            <BaseLayout>
                <AppRouter />
            </BaseLayout>
        </>
    );
}