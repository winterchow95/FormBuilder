
import React from 'react'
import { Route } from "./route";
import {Provider} from 'react-redux';
import store from './redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';

const persistedStore = persistStore(store);

//App main page
const App: () => Node = () => {

  return (
    //Use provider from react-redux to link redux store with react-native application
      <Provider store= {store}>
        <PersistGate persistor= {persistedStore} loading = {null}>
          <Route />
        </PersistGate>
      </Provider>
  );

}

export default App;
