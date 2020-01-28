import Organization from '../types/organization';

export const SET_TOKEN_AND_ORGANISATION = 'SET_TOKEN_AND_ORGANISATION';

export const setTokenAndOrganisation = (
    token: string,
    organisation: Organization[],
) => ({
    type: SET_TOKEN_AND_ORGANISATION,
    token,
    organisation,
});
