import axios from 'axios';
import {initialState} from '../reducers/authReducer'
import { 
    OBTAIN_TOKEN_PENDING, OBTAIN_TOKEN_SUCCESS, OBTAIN_TOKEN_FAILURE,
    USER_AUTH_DELETE
} from '../reducers/authReducer'
axios.defaults.baseURL = 'http://localhost:8000'


function obtainTokenResponse(payload) {
    return axios.post(initialState.data.endpoints.obtainJWT, payload)
}

export function obtainToken(payload) {
    return async dispatch => {
        // 먼저, 요청이 시작했다는것을 알립니다
        dispatch({ type: OBTAIN_TOKEN_PENDING });
        // 요청을 시작합니다
        // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
        try {
            const response = await obtainTokenResponse(payload)
            localStorage.setItem('acc', response.data.access)
            localStorage.setItem('ref', response.data.refresh)
            localStorage.setItem('nick', response.data.nickname)
            dispatch({
                type: OBTAIN_TOKEN_SUCCESS,
                payload: {access: response.data.access, refresh: response.data.refresh}
            })
        }
        catch(error) {
            dispatch({
                type: OBTAIN_TOKEN_FAILURE,
                payload: error.response.status,
            });
        }
    }
}

export function obtainTokenSuccess(data) {
    localStorage.setItem('acc', data.access)
    localStorage.setItem('ref', data.refresh)
    localStorage.setItem('nick', data.nickname)

    return async dispatch => {
        dispatch({
            type: OBTAIN_TOKEN_SUCCESS,
            payload: {...data}
        })
    }
}

export function logout() {
    return async dispatch => {
        localStorage.removeItem('acc')
        localStorage.removeItem('ref')
        localStorage.removeItem('nick')
        
        dispatch({
            type: USER_AUTH_DELETE,
        })
    }
}