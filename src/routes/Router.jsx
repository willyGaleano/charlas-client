import { useSelector } from "react-redux";
import BaseAuthLayout from "../layouts/BaseAuthLayout";
import BaseLayout from "../layouts/BaseLayout";
import { token } from "../utils/auth/auth.service";
import AppRouter from "./AppRouter";
import AuthRouter from "./AuthRouter";

const Router = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return !isLoggedIn && !token.get() ? (
    <BaseAuthLayout>
      <AuthRouter />
    </BaseAuthLayout>
  ) : (
    <BaseLayout>
      <AppRouter />
    </BaseLayout>
  );
};

export default Router;
