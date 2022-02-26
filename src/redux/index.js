import {applyMiddleware, createStore} from 'redux';

import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const middleware = [thunk];
import rootReducer from './reducers';

const initial_state = {};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const store = createStore(
  persistedReducer,
  initial_state,
  applyMiddleware(...middleware),
);

const persistor = persistStore(store);

export {store, persistor};
