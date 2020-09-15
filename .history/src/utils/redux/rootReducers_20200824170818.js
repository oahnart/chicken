import { combineReducers } from "redux";

import systemReducer from "../../features/system/reducer";
import homeReducer from "../../features/home/reducers";

const rootReducer = combineReducers({
  systemReducer,
  homeReducer,
});

export default rootReducer;
