import { types } from "../types/types";
const initialState = {
  loadingApp: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.appLoading:
      return {
        ...state,
        loadingApp: action.payload,
      };

    default:
      return state;
  }
};
