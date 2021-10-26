import { AnimatePresence } from "framer-motion";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import LoginPage from "../pages/auth/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import MisCharlasPage from "../pages/mis-charlas/MisCharlasPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import AdminRouter from "./AdminRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <PrivateRouter path="/" component={HomePage} exact />
        <PrivateRouter path="/mis-charlas" component={MisCharlasPage} exact />
        <PrivateRouter path="/admin" component={AdminRouter} />
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
