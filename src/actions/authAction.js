import axios from 'axios';
import {initialState} from '../reducers/authReducer'
import { OBTAIN_TOKEN_PENDING, OBTAIN_TOKEN_SUCCESS, OBTAIN_TOKEN_FAILURE} from '../reducers/authReducer'
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