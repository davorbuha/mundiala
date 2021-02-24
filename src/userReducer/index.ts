import {
    SET_TOKEN_AND_ORGANISATION,
    SET_ACCOUNT,
    SET_PASSWORD,
    SET_NOTIFICATIONS,
    SET_PUSH_TOPICS,
    SET_USER_EMAIL,
    SET_USER_BANNERS,
    SET_ADMIN,
    SET_PUSH_TOPIC_NAME,
    SET_RPN,
} from './actions';
import Organization from '../types/organization';
import Account from '../types/account';
import Banner from '../types/banner';
import {PushTopicName} from '../types/login';

const INITIAL_STATE: State = {
    token: '',
    organisations: [],
    account: null,
    password: null,
    notifications: null,
    topics: [],
    email: '',
    banners: [],
    admin: false,
    ptn: [],
    rpn: [],
};

export interface State {
    token: string;
    organisations: Organization[];
    account: Account;
    password: string;
    notifications: boolean;
    topics: string[];
    email: string;
    banners: Banner[];
    admin: boolean;
    ptn: PushTopicName[];
    rpn: PushTopicName[];
}

const userReducer = (state: State = INITIAL_STATE, action): State => {
    switch (action.type) {
        case SET_PUSH_TOPICS:
            return {
                ...state,
                topics: action.topics,
            };
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

        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notif,
            };
        case SET_USER_EMAIL:
            return {
                ...state,
                email: action.email,
            };
        case SET_USER_BANNERS:
            return {
                ...state,
                banners: action.banners,
            };
        case SET_ADMIN:
            return {...state, admin: true};
        case SET_PUSH_TOPIC_NAME:
            return {...state, ptn: action.ptn};
        case SET_RPN:
            return {...state, rpn: action.rpn};
        default:
            return state;
    }
};

export default userReducer;
