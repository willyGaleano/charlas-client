import { AnimatePresence } from "framer-motion";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import HomePage from "../pages/home/HomePage";
import MisCharlasPage from "../pages/mis-charlas/MisCharlasPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";

const AppRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/mis-charlas" component={MisCharlasPage} exact />
        <Route path="/admin" component={AdminPage} exact />
        <Route path="/login" render={() => <Redirect to="/" />} />
        <Route
          path="*"
          component={NotFoundPage}
          render={() => <Redirect to="/notfound" />}
        />
      </Switch>
    </AnimatePresence>
  );
};

export default AppRouter;
