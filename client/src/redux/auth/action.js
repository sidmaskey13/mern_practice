import {
    LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS
} from './types'

export const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        payload: response
    }
}

export const loginFail = () => {
    return {
        type: LOGIN_FAIL,
    }
}

export const logOutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}