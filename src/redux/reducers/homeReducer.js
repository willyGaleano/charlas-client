import { types } from "../types/types";
const initialState = {};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.homeListaCharlas:
      return;

    default:
      return state;
  }
};
