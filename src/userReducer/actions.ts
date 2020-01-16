export const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token: string) => ({
    type: SET_TOKEN,
    token,
});
