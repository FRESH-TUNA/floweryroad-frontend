import axios from 'axios';
import {initialState} from '../reducers/authReducer'
axios.defaults.baseURL = 'http://localhost:8000'

export const OBTAIN_TOKEN_PENDING = 'OBTAIN_TOKEN_PENDING';
export const OBTAIN_TOKEN_SUCCESS = 'OBTAIN_TOKEN_SUCCESS';
export const OBTAIN_TOKEN_FAILURE = 'OBTAIN_TOKEN_FAILURE';

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
            dispatch({
                type: OBTAIN_TOKEN_SUCCESS,
                payload: {jwt: 'jwt ' + response.data.token, username: payload.username}
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