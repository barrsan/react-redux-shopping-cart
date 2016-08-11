import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function (initialState) {
  let store;
  /* eslint-disable no-undef */
  if (process.env.NODE_ENV === 'development') {
  /* eslint-enable no-undef */
    const logger = createLogger();
    store = compose(
      applyMiddleware(thunk),
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
  } else {
    store = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
  }

  return store(rootReducer, initialState);
}
