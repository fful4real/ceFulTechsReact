import API_ROUTES from '../../api-route';
import authActionTypes from "./auth.types";
import AxiosAgent from '../../axios-agent';
import { SubmissionError } from 'redux-form';
import { destroyUserDetails } from '../user/user.action';

export const userLoginStart = ()=>({
    type: authActionTypes.USER_LOGIN_START,
})
export const userLoginSuccess = ({token,id}) =>({
    type: authActionTypes.USER_LOGIN_SUCCESS,
    token,
    userId:id
})

export const userLoginFailure = error =>({
    type: authActionTypes.USER_LOGIN_FAILURE,
    payload: error
})

export const userSetAuth = ({token,userId}) =>({
    type: authActionTypes.USER_SET_AUTH,
    token,
    userId
})
// Destroy User Authentication
export const userDestroyAuth = () =>({
    type: authActionTypes.USER_DESTROY_AUTH
})
export const userDestroyAuthAttemp = () =>{
    return dispatch => {
        dispatch(userDestroyAuth())
        dispatch(destroyUserDetails())
    }
}

export const userLoginAttempt = (username, password)=>{
    const userCredentials = {username, password}
    console.log("Fetching User...")
    return dispatch =>{
        dispatch(userLoginStart());
        AxiosAgent.request('post',API_ROUTES.login, null, userCredentials)
        .then(resp => {
            const {token, id} = resp.data
            AxiosAgent.setToken(token);
            window.localStorage.setItem('token',token)
            window.localStorage.setItem('userId',id)
            dispatch(userLoginSuccess({token, id}))
        })
        .catch(error => {
            if(error.validationErrors) {
                console.log('Errorororor')
                throw new SubmissionError(error.validationErrors)
            } else {
            // what you do about other communication errors is up to you
                dispatch(userLoginFailure(error))
                console.log(error.message)
            }
        })
    }
}

// App Finihsed Loading

export const appFinishedLoading = () =>({
    type: authActionTypes.APP_FINISHED_LOADING
})

export const appFinishedLoadingAttempt = ()=>{
    return dispatch => {dispatch(appFinishedLoading())}
}