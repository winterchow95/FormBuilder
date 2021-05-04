import {SET_DATA} from './constants';

//redux action to store UI components
export function setDataAction(data, keycount){
    return{
        type: SET_DATA,
        data,
        keycount,
    }
}

