import { motion } from "framer-motion";
import { Route, Redirect } from "react-router-dom";
import { token } from "../utils/auth/auth.service";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const config = {
    type: "spring",
    mass: 0.25,
    stiffness: 300,
    velocity: 10,
    restSpeed: 0.2,
    restDelta: 0.2,
    damping: 6,
  };
  return (
    <Route
      {...rest}
      component={(props) =>
        token.get() ? (
          <motion.div
            transition={config}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <Component {...props} />
          </motion.div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRouter;
