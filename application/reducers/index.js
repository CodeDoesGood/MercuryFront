import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import version from './version';
import profile from './profile';

// setup the master reducer
const rootReducer = combineReducers({
  version,
  profile,
  routing: routerReducer,
});

export default rootReducer;
