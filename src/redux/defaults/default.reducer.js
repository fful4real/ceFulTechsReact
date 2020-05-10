import DefaultParamsActionTypes from "./default.types";



const INITIAL_STATE = {
    itemsPerPage:10,
    activePage:'dashboard'
}

const DefaultParamsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case DefaultParamsActionTypes.SET_ACTIVE_PAGE:
            return{
                ...state,
                activePage:action.activePage
            }
    
        default:
            return state;
    }
}

export default DefaultParamsReducer;