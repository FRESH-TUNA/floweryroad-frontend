import { handleActions } from 'redux-actions';
// import {OBTAIN_TOKEN_PENDING, OBTAIN_TOKEN_SUCCESS, OBTAIN_TOKEN_FAILURE} from '../actions/authAction'

export const OBTAIN_TOKEN_PENDING = 'OBTAIN_TOKEN_PENDING';
export const OBTAIN_TOKEN_SUCCESS = 'OBTAIN_TOKEN_SUCCESS';
export const OBTAIN_TOKEN_FAILURE = 'OBTAIN_TOKEN_FAILURE';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const USER_AUTH_DELETE = 'USER_AUTH_DELETE';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const initialState = {
    pending: false,
    error: false,
    isLogin: localStorage.getItem('acc') ? true : false,
    endpoints: {
        obtainJWT: '/signin',
        refreshJWT: '/token/refresh'
    },
    data: {
        email: localStorage.getItem('ema'),
        access: localStorage.getItem('acc'),
        refresh: localStorage.getItem('ref'),
        nickname: localStorage.getItem('nic'),
    },
    refreshService: null
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
            error: false,
            data: {
                ...action.payload.data
            },
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
    [REFRESH_TOKEN_SUCCESS]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...state.data,
                access: action.payload.access
            }
        }
    },
    [USER_AUTH_DELETE]: (state, action) => {
        return {
            ...state,
            isLogin: false,
            error: false,
            data: {
                access: '',
                refresh: '',
                nickname: '',
            },
        }
    },
    [CHANGE_NICKNAME_SUCCESS]: (state, action) => {
        return {
            ...state,
            error: false,
            data: {
                ...state.data,
                nickname: action.payload.data.nickname,
            },
        }
    },
    [CHANGE_NICKNAME_FAILURE]: (state, action) => {
        return {
            ...state,
            error: true,
            errorContext: action.payload
        }
    }
}, initialState);
