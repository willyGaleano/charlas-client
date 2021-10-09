import { ACCESS_TOKEN_NAME } from "../consts";

export const token = {
  get: () => {
    return window.localStorage.getItem(ACCESS_TOKEN_NAME);
  },
  set: (token) => {
    window.localStorage.setItem(ACCESS_TOKEN_NAME, token);
  },
  remove: () => {
    window.localStorage.removeItem(ACCESS_TOKEN_NAME);
    return true;
  },
};
