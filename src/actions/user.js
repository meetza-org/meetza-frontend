import { RSAA } from 'redux-api-middleware';
import USER from '../action_types/user';

export const login = data => ({
    [RSAA] : {
        endpoint: 'login',
        method: 'POST',
        body: JSON.stringify(data),
        types: [
            USER.LOGIN.LOAD,
            USER.LOGIN.SUCCESS,
            USER.LOGIN.FAIL
        ]
    }
});

export const register = data => ({
    [RSAA] : {
        endpoint: 'register',
        method: 'POST',
        body: JSON.stringify(data),
        types: [
            USER.REGISTER.LOAD,
            USER.REGISTER.SUCCESS,
            USER.REGISTER.FAIL
        ]
    }
});

export const logout = data => ({
    type: USER.LOGOUT.SUCCESS,
    data: data
});
