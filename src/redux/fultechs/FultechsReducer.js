import FultechsActionTypes from "./FultechsTypes";



const INITIAL_STATE = {
    itemsPerPage:10,
    activePage:'dashboard',
    isRefreshing:false,
    refreshTimeInterval:20000
}

const FultechsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case FultechsActionTypes.SET_ACTIVE_PAGE:
            return{
                ...state,
                activePage:action.activePage
            }
    
        default:
            return state;
    }
}

export default FultechsReducer;