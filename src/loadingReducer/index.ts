import {START_LOADING, STOP_LOADING} from './actions';

const INITIAL_STATE = {};

export interface State {
    [name: string]: boolean;
}

const loadingReducer = (state: State = INITIAL_STATE, action): State => {
    switch (action.type) {
        case START_LOADING:
            return {...state, [action.name]: true};
        case STOP_LOADING:
            return {...state, [action.name]: false};
        default:
            return state;
    }
};

export default loadingReducer;
