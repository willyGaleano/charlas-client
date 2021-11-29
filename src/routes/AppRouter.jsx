import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import MisCharlasPage from "../pages/mis-charlas/MisCharlasPage";
import MisEstadisticas from "../pages/mis-estadisticas/MisEstadisticas";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import AdminRouter from "./AdminRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <PrivateRouter path="/" component={HomePage} exact />
        <PrivateRouter path="/mis-eventos" component={MisCharlasPage} exact />
        <PrivateRouter
          path="/mis-estadisticas"
          component={MisEstadisticas}
          exact
        />
        <PrivateRouter path="/admin">
          {user.roles.length > 1 ? <AdminRouter /> : <Redirect to="/404" />}
        </PrivateRouter>
        <PublicRouter path="/login" component={LoginPage} exact />
        <Route path="/404" component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default AppRouter;
