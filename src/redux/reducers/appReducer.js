import { types } from "../types/types";
const initialState = {
  loading: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.appLoading:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
