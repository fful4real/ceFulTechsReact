import userActionTypes from "./user.types";


const INITIAL_STATE = {
    isFetchingUser:true,
    userData:{},
    userError:null
}

const userReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case userActionTypes.USER_FETCHING_START:
            return{
                ...state,
                isFetchingUser:true
            }
        case userActionTypes.USER_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingUser:false,
                userData: action.user,
                userError:null
            }
        case userActionTypes.USER_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingUser:false,
                userData:null,
                userError: action.error
            }
    
        default:
            return state;
    }
}

export default userReducer;