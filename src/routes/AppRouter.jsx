import { AnimatePresence } from "framer-motion";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import LoginPage from "../pages/auth/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import MisCharlasPage from "../pages/mis-charlas/MisCharlasPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <PrivateRouter path="/" component={HomePage} exact />
        <PrivateRouter path="/mis-charlas" component={MisCharlasPage} exact />
        <PrivateRouter path="/admin" component={AdminPage} exact />
        <PublicRouter path="/login" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </AnimatePresence>
  );
};

export default AppRouter;
