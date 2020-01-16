import {SHOW_BACKGROUND} from './actions';
import {HIDE_BACKGROUND} from './actions';

const INITIAL_STATE = {
    background: true,
};

export interface State {
    background: boolean;
}

const backgroundReducer = (state = INITIAL_STATE, action): State => {
    switch (action.type) {
        case SHOW_BACKGROUND:
            return {...state, background: true};
        case HIDE_BACKGROUND:
            return {...state, background: false};
        default:
            return state;
    }
};

export default backgroundReducer;
