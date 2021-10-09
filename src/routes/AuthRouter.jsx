import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";

const AuthRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route
          path="/"
          component={LoginPage}
          render={() => <Redirect to="/login" />}
        />
        <Route path="/login" component={LoginPage} exact />
        <Route
          path="*"
          component={NotFoundPage}
          render={() => <Redirect to="/notfound" />}
        />
      </Switch>
    </AnimatePresence>
  );
};

export default AuthRouter;
