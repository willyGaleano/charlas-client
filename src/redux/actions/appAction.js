import { types } from "../types/types";

export const loadingAppAction = (value) => ({
  type: types.appLoading,
  payload: value,
});
