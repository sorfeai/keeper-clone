import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import sagas from './sagas';


const configureStore = () => {
  const composeEnhancers = (
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  );

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
      stateTransformer: (state) =>
        Object.keys(state).reduce((acc, key) => ({
          ...acc,
          [key]: state[key].toJSON
            ? state[key].toJSON()
            : state[key],
        }), {}),
    });

    middlewares.push(logger);
  }

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(sagas);

  return store;
};


export default configureStore;
