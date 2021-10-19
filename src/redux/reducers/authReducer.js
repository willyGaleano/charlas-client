import { types } from "../types/types";

const initialValues = {
  user: {
    id: "",
    userName: "",
    email: "",
    roles: [],
  },
  isLoggedIn: false,
};

export const authReducer = (state = initialValues, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: action.payload.id,
          userName: action.payload.userName,
          email: action.payload.email,
          roles: [...action.payload.roles],
        },
      };
    case types.authLogout:
      return {
        ...initialValues,
      };

    default:
      return state;
  }
};
