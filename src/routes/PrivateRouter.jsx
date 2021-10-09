import { motion } from "framer-motion";
import { Route, Redirect } from "react-router-dom";
import { token } from "../utils/auth/auth.service";

const PrivateRouter = ({ componente: Component, ...rest }) => {
  const config = {
    type: "spring",
    damping: 20,
    stiffness: 100,
  };
  return (
    <Route
      {...rest}
      render={(props) =>
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