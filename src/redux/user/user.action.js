import API_ROUTES from '../../api-route';
import userActionTypes from "./user.types";
import AxiosAgent from '../../axios-agent';

export const userFetchingStart = ()=>({
    type: userActionTypes.USER_FETCHING_START,
})
export const userFetchingSuccess = (user) =>({
    type: userActionTypes.USER_FETCHING_SUCCESS,
    user
})

export const userFetchingFailure = error =>({
    type: userActionTypes.USER_FETCHING_FAILURE,
    error
})

export const userFetchingAttempt = (userId)=>{
    return dispatch =>{
        dispatch(userFetchingStart());
        AxiosAgent.request('get',API_ROUTES.user(userId), null, null)
        .then(resp => {
            dispatch(userFetchingSuccess(resp.data))
        })
        .catch(error => {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('userId')
            userId&&window.location.reload()
        })
    }
}

export const destroyUserDetails = ()=>({
    type: userActionTypes.DESTROY_USER
})