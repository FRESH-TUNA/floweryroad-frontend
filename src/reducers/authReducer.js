import { handleActions } from 'redux-actions';
// import {OBTAIN_TOKEN_PENDING, OBTAIN_TOKEN_SUCCESS, OBTAIN_TOKEN_FAILURE} from '../actions/authAction'

export const OBTAIN_TOKEN_PENDING = 'OBTAIN_TOKEN_PENDING';
export const OBTAIN_TOKEN_SUCCESS = 'OBTAIN_TOKEN_SUCCESS';
export const OBTAIN_TOKEN_FAILURE = 'OBTAIN_TOKEN_FAILURE';
export const USER_AUTH_DELETE = 'USER_AUTH_DELETE';

export const initialState = {
    pending: false,
    error: false,
    isLogin: localStorage.getItem('acc') ? true : false,
    data: {
        access: localStorage.getItem('acc'),
        refresh: localStorage.getItem('refresh'),
        username: localStorage.getItem('nickname'),
        endpoints: {
            obtainJWT: '/signin',
            refreshJWT: 'api/refresh'
        },
    }
};

export default handleActions({
    [OBTAIN_TOKEN_PENDING]: (state) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [OBTAIN_TOKEN_SUCCESS]: (state, action) => {
        return {
            ...state,
            pending: false,
            isLogin: true,
            data: {
                ...action.payload
            }
        };
    },
    [OBTAIN_TOKEN_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true,
            status: action.payload
        }
    },

    [USER_AUTH_DELETE]: (state, action) => {
        return {
            ...state,
            isLogin: false,
            data: {
                access: '',
                refresh: '',
                nickname: '',
            }
        }
    }
}, initialState);
