import { Route, Switch } from "wouter"
import { ROUTES } from "../constants/routes"
import { LandingPage } from "../pages/LandingPage"
import { NotFound } from "../pages/NotFound"

export const AppRouter = () => {
    return (
        <Switch>
            <Route path={ROUTES.LANDING_PAGE} component={LandingPage} />
            <Route component={NotFound} />
        </Switch>
    )
}