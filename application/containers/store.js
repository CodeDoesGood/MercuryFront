import { createStore } from 'redux';

import endpoints from '../endpoints/index';
import rootReducer from '../reducers/index';

const authentication = { username: null, result: false };

// announcements and notifications
const announcements = [];
const notifications = [];

const client = endpoints();

const defaultState = {
  authentication,
  announcements,
  notifications,
  client,
};

const store = createStore(
  rootReducer,
  defaultState,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


export default store;
