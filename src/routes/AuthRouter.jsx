import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import PublicRouter from "./PublicRouter";

const AuthRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <PublicRouter path="/login" component={LoginPage} exact />
        <PublicRouter path="/register" component={RegisterPage} exact />
        <PublicRouter path="/" component={LoginPage} exact />
        <PublicRouter path="*" component={LoginPage} />
      </Switch>
    </AnimatePresence>
  );
};

export default AuthRouter;
