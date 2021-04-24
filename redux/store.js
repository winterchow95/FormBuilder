import {createStore} from 'redux';
import reducer from './reducer';

//create store to be used as global source of truth
const store = createStore(reducer);

export default store;