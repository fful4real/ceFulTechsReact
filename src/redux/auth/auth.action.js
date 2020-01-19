import API_ROUTES from '../../api-route';
import AxiosRequest from '../../axios-agent';
import authActionTypes from "./auth.types";
import axios from 'axios'
// import { SubmissionError } from 'redux-form';

export const userLoginStart = ()=>({
    type: authActionTypes.USER_LOGIN_START,
})
export const userLoginSuccess = (token,userId) =>({
    type: authActionTypes.USER_LOGIN_SUCCESS,
    token,
    userId
})

export const userLoginFailure = error =>({
    type: authActionTypes.USER_LOGIN_FAILURE,
    payload: error
})

export const userLoginAttempt = (username, password)=>{
    const userCredentials = {username, password}
    console.log("Fetching User...")
    return dispatch =>{
        dispatch(userLoginStart());
        AxiosRequest('post',API_ROUTES.login, null, userCredentials)
        .then(resp => {
            const token = resp.data.token;
            axios.interceptors.request.use(
                config => {
                console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
                return {
                  ...config,
                  headers: {
                    Authorization:`Bearer ${token}`
                  }
                }
                },
                error => console.error(error)

              );
            dispatch(userLoginSuccess(token, null))
            window.localStorage.setItem('token',token)
        })
        .catch(error => {
            dispatch(userLoginFailure(error))
            // throw new SubmissionError({
            //     error: "Username Or Password not correct!"
            // });
        })
    }
}