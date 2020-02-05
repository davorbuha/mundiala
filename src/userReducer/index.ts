import {SET_TOKEN_AND_ORGANISATION, SET_ACCOUNT, SET_PASSWORD} from './actions';
import Organization from '../types/organization';
import Account from '../types/account';

const INITIAL_STATE: State = {
    token: '',
    organisations: [],
    account: null,
    password: null,
};

export interface State {
    token: string;
    organisations: Organization[];
    account: Account;
    password: string;
}

const userReducer = (state: State = INITIAL_STATE, action): State => {
    switch (action.type) {
        case SET_TOKEN_AND_ORGANISATION:
            return {
                ...state,
                token: action.token,
                organisations: action.organisation,
            };
        case SET_ACCOUNT:
            return {
                ...state,
                account: action.account,
            };

        case SET_PASSWORD:
            return {
                ...state,
                password: action.password,
            };
        default:
            return state;
    }
};

export default userReducer;
