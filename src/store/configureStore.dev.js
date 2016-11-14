// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {compose, createStore, applyMiddleware} from 'redux'
import rootReducer from '../actions';
import {hashHistory} from 'react-router'
import createLogger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'


let middlewares=[thunkMiddleware, routerMiddleware(hashHistory), createLogger()]

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../actions', () => {
      const nextReducer = require('../actions').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
