import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseAuthLayout from "../layouts/BaseAuthLayout";
import BaseLayout from "../layouts/BaseLayout";
import { refreshTokenAction } from "../redux/actions/authAction";
import { token } from "../utils/auth/auth.service";
import AppRouter from "./AppRouter";
import AuthRouter from "./AuthRouter";

const Router = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  /*
  useEffect(() => {
    console.log("isLoggedIn : ", isLoggedIn);
  }, [isLoggedIn]);*/

  return (!isLoggedIn && !token.get()) ? (
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
