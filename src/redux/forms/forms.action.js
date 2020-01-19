import FormActionTypes from "./forms.types";
import API_ROUTES from '../../api-route';
import axios from 'axios'
import AxiosRequest from '../../axios-agent';

export const userLoginStart = ()=>({
    type: FormActionTypes.USER_LOGIN_START
})
export const userLoginSuccess = (token,userId) =>({
    type: FormActionTypes.USER_LOGIN_SUCCESS,
    token,
    userId
})
export const userLoginFailure = error =>({
    type: FormActionTypes.USER_LOGIN_FAILURE,
    payload: error
})

export const userLoginAttempt = (username, password)=>{
    const userCredentials = {username, password}
    console.log("Fetching User...")
    return dispatch =>{
        dispatch(userLoginStart());
        AxiosRequest('post',API_ROUTES.login, null, userCredentials)
        .then(resp => {
            axios.interceptors.request.use(
                config => {
                console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
                return {
                  ...config,
                  headers: {
                    Authorization:`Bearer ${resp.data.token}`
                  }
                }
                },
                error => console.error(error)

              );
            console.log(resp)
            dispatch(userLoginSuccess(resp.data.token, null))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}