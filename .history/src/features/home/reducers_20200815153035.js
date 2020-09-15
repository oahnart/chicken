import produce from "immer";

import * as actionTypes from "./actionTypes";

const initialState = {
  categories: [],
  isFetching: false,
};

const home = (state = initialState, action) =>
  produce(state, (newState) => {
    switch (action.type) {
      case actionTypes.FETCHING_CATEGORY:
        newState.isFetching = true;
        break;
      case actionTypes.FETCHING_CATEGORY_SUCCESS:
        newState.categories = action.payload;
        newState.isFetching = false;
        break;
      case actionTypes.FETCHING_CATEGORY_ERROR:
        newState.isFetching = false;
        break;
      default:
        newState = state;
        break;
    }
  });

export default home;
