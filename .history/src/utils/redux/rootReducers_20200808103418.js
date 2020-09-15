import { combineReducers } from 'redux';

import systemReducer from '../../features/system/reducer';

const rootReducer = combineReducers({
  systemReducer,
});

export default rootReducer;
