import { HomeAPI } from "../../services/api";
import { loadingAppAction } from "./appAction";

export const getHomeCharlas = (req) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAppAction(true));
      const resp = await HomeAPI.listHomeCharlas(req);
      dispatch(loadingAppAction(false));
    } catch (error) {}
  };
};
