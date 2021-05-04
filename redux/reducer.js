import {SET_DATA} from './constants';

//create an empty array as initial state
const INITIAL_STATE = {
    data: [],
    keycount: 0,
}

//update state when corresponding action found
function reducer(state=INITIAL_STATE, action){
    switch (action.type) {
        case SET_DATA:
            alert(JSON.stringify(action.data));
            return {
                ...state,
                data: action.data,
                keycount: action.keycount,
            }
        default:
            return state;
    }
}

export default reducer;