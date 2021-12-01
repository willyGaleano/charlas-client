import { message } from "antd";
import { AuthAPI } from "../../services/api";
import { token } from "../../utils/auth/auth.service";
import history from "../../utils/history";
import { types } from "../types/types";
import { loadingAppAction } from "./appAction";

export const loginAction = (value) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAppAction(true));
      const resp = await AuthAPI.startLogin(value);
      if (resp?.succeeded) {
        token.set(resp.data.jwToken);
        dispatch(login(resp.data));
      }
      dispatch(loadingAppAction(false));
    } catch (ex) {
      dispatch(loadingAppAction(false));
      message.error("Email o password incorrectos", 5);
    }
  };
};

const login = (resp) => ({
  type: types.authLogin,
  payload: resp,
});

export const registerAction = (value) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAppAction(true));
      const resp = await AuthAPI.startRegister(value);
      if (resp.succeeded) {
        message.success(resp.message);
        history.push("/login");
      }
      dispatch(loadingAppAction(false));
    } catch (ex) {
      dispatch(loadingAppAction(false));
      message.error(ex.message);
    }
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    token.remove();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});

export const refreshTokenAction = () => {
  return async (dispatch) => {
    try {
      const resp = await AuthAPI.refreshToken();
      if (resp.succeeded) {
        token.set(resp.data.jwToken);
        dispatch(login(resp.data));
      }
    } catch (ex) {
      message.error(ex.message);
      dispatch(logoutAction());
    }
  };
};
