import Organization from '../types/organization';
import Account from '../types/account';

export const SET_TOKEN_AND_ORGANISATION = 'SET_TOKEN_AND_ORGANISATION';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export const setTokenAndOrganisation = (
    token: string,
    organisation: Organization[],
) => ({
    type: SET_TOKEN_AND_ORGANISATION,
    token,
    organisation,
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
