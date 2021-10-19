import { motion } from "framer-motion";
import { Route, Redirect } from "react-router-dom";
import { token } from "../utils/auth/auth.service";

const PublicRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        token.get() ? (
          <Redirect to="/" />
        ) : (
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ scale: 0 }}
          >
            <Component {...props} />
          </motion.div>
        )
      }
    ></Route>
  );
};

export default PublicRouter;
