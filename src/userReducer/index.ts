import {SET_TOKEN_AND_ORGANISATION, SET_ACCOUNT} from './actions';
import Organization from '../types/organization';
import Account from '../types/account';

const INITIAL_STATE: State = {
    token: '',
    organisations: [],
    account: null,
};

export interface State {
    token: string;
    organisations: Organization[];
    account: Account;
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
        default:
            return state;
    }
};

export default userReducer;
