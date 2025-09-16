import BaseLayout from "./components/provider/BaseLayout";
import { AppRouter } from "./router/AppRouter";

export const App = () => {

    return (
        <>
            <BaseLayout>
                <AppRouter />
            </BaseLayout>
        </>
    );
}