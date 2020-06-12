import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from 'app/reducers';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(thunk, sagaMiddleware);

const configureStore = (preloadedState) => {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, preloadedState, enhancer);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
