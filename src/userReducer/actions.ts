import Organization from '../types/organization';
import Account from '../types/account';
import Banner from '../types/banner';
import {PushTopicName} from '../types/login';

export const SET_TOKEN_AND_ORGANISATION = 'SET_TOKEN_AND_ORGANISATION';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_PUSH_TOPICS = 'SET_PUSH_TOPICS';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_BANNERS = 'SET_USER_BANNERS';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_PUSH_TOPIC_NAME = 'SET_PUSH_TOPIC_NAME';
export const SET_RPN = 'SET_RPN';

export const setTokenAndOrganisation = (
    token: string,
    organisation: Organization[],
) => ({
    type: SET_TOKEN_AND_ORGANISATION,
    token,
    organisation,
});

export const setRPN = (rpn: PushTopicName[]) => ({
    type: SET_RPN,
    rpn,
});

export const setPushTopicNames = (ptn: PushTopicName[]) => ({
    type: SET_PUSH_TOPIC_NAME,
    ptn,
});

export const setAdmin = () => ({
    type: SET_ADMIN,
});

export const setUserEmail = (email: string) => ({
    type: SET_USER_EMAIL,
    email,
});

export const setPushTopics = (topics: string[]) => ({
    type: SET_PUSH_TOPICS,
    topics,
});

export const setAccount = (account: Account) => ({
    type: SET_ACCOUNT,
    account,
});

export const setPassword = (password: string) => ({
    type: SET_PASSWORD,
    password,
});

export const setNotifications = (notif: boolean) => ({
    type: SET_NOTIFICATIONS,
    notif,
});

export const setUserBanners = (banners: Banner[]) => ({
    type: SET_USER_BANNERS,
    banners,
});
