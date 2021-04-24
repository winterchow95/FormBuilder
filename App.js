
import React from 'react'
import { Route } from "./route";
import {Provider} from 'react-redux';
import store from './redux/store';

//App main page
const App: () => Node = () => {

  return (
    //Use provider from react-redux to link redux store with react-native application
      <Provider store= {store}>
        {/* Use route from route.js to manage navigation */}
        <Route />
      </Provider>
  );

}

export default App;
