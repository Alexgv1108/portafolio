import BaseLayout from "./components/provider/BaseLayout";
import { useToggleTheme } from "./hooks/style/useToggleTheme";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
    useToggleTheme();

    return (
        <>
            <BaseLayout>
                <AppRouter />
            </BaseLayout>
        </>
    );
}