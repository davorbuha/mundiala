import {SET_TOKEN} from './actions';

const INITIAL_STATE = {
    token: '',
};

export interface State {
    token: string;
}

const userReducer = (state: State = INITIAL_STATE, action): State => {
    switch (action.type) {
        case SET_TOKEN:
            return {...state, token: action.token};
        default:
            return state;
    }
};

export default userReducer;
