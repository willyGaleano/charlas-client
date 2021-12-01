import "./App.less";
import { Router as RouterHistory } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import history from "./utils/history.jsx";
import Router from "./routes/Router";
import { store } from "./redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshTokenAction } from "./redux/actions/authAction";
import { Spin } from "antd";
import { token } from "./utils/auth/auth.service";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn && !!token.get()) {
      dispatch(refreshTokenAction());
    }
  }, [dispatch]);

  return <Router />;
}

export default App;
