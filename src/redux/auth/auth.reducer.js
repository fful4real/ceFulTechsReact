import authActionTypes from "./auth.types";


const INITIAL_STATE = {
    token:null,
    userId:null,
    isLogging: false,
    error:null,
    isAuthenticated:false,
    loginFailed:false
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
                isAuthenticated:true,
            }
        case authActionTypes.USER_SET_AUTH:
            return{
                ...state,
                token: action.token,
                userId:action.userId,
                isLogging:false,
                isAuthenticated:true
            }
        
        case authActionTypes.USER_LOGIN_FAILURE:
            return{
                ...state,
                token: null,
                isLogging: false,
                error:action.error,
                loginFailed:true

            }
        
        case authActionTypes.USER_DESTROY_AUTH:
            return{
                ...state,
                token: null,
                userId: null,
                isAuthenticated: false,
            }
    
        default:
            return state;
    }
}

export default authReducer;