import BaseLayout from "./components/provider/BaseLayout";
import { AppRouter } from "./router/AppRouter";
import { useScrollToTop } from "./hooks/scroll/useScrollToTop";

export const App = () => {
    useScrollToTop();

    return (
        <>
            <BaseLayout>
                <AppRouter />
            </BaseLayout>
        </>
    );
}