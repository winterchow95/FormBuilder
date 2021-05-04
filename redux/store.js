import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {createLogger} from 'redux-logger';
//create store to be used as global source of truth

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['reducer'],
  }
  
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(createLogger()));

// const store = createStore(reducer);

export default store;