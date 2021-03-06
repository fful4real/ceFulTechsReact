import authActionTypes from "./auth.types";


const INITIAL_STATE = {
    token:null,
    userId:null,
    isLogging: false,
    error:null,
    isUserAuthenticated:true,
    loginFailed:false,
    appIsLoading:true
}

const authReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case authActionTypes.USER_LOGIN_START:
            return{
                ...state,
                isLogging:true,
                loginFailed:false
            }
        case authActionTypes.USER_LOGIN_SUCCESS:
            return{
                ...state,
                token: action.token,
                userId: action.userId,
                isLogging:false,
                isUserAuthenticated:true,
            }
        case authActionTypes.USER_SET_AUTH:
            return{
                ...state,
                token: action.token,
                userId:action.userId,
                isLogging:false,
                isUserAuthenticated:true
            }
        
        case authActionTypes.USER_LOGIN_FAILURE:
            return{
                ...state,
                token: null,
                isLogging: false,
                error:action.error,
                loginFailed:true

            }
        
        case authActionTypes.APP_FINISHED_LOADING:
            return{
                ...state,
                appIsLoading:false
            }
        
        case authActionTypes.USER_DESTROY_AUTH:
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('userId')
            return{
                ...state,
                token: null,
                userId: null,
                isUserAuthenticated: false,
            }
    
        default:
            return state;
    }
}

export default authReducer;