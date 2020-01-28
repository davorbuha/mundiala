import {SET_TOKEN_AND_ORGANISATION} from './actions';
import Organization from '../types/organization';

const INITIAL_STATE = {
    token: '',
    organisations: [],
};

export interface State {
    token: string;
    organisations: Organization[];
}

const userReducer = (state: State = INITIAL_STATE, action): State => {
    switch (action.type) {
        case SET_TOKEN_AND_ORGANISATION:
            return {
                ...state,
                token: action.token,
                organisations: action.organisation,
            };
        default:
            return state;
    }
};

export default userReducer;
