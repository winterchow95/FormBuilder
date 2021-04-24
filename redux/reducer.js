import {SET_DATA} from './constants';

//create an empty array as initial state
const INITIAL_STATE = {
    data: [],
}

//update state when corresponding action found
function reducer(state=INITIAL_STATE, action){
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data,
            }
        default:
            state;
    }
}

export default reducer;