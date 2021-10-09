import BaseAuthLayout from "../layouts/BaseAuthLayout";
import BaseLayout from "../layouts/BaseLayout";
import AppRouter from "./AppRouter";
import AuthRouter from "./AuthRouter";

const Router = () => {
  const isLoggedIn = true;

  if (!isLoggedIn)
    return (
      <BaseAuthLayout>
        <AuthRouter />
      </BaseAuthLayout>
    );
  else
    return (
      <BaseLayout>
        <AppRouter />
      </BaseLayout>
    );
};

export default Router;
