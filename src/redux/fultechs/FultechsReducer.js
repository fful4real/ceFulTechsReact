import FultechsActionTypes from "./FultechsTypes";



const INITIAL_STATE = {
    itemsPerPage:10,
    activePage:'dashboard',
    isRefreshing:false,
    refreshTimeInterval:20000,
    modalAlert: {
        show:'hide',
        message: '',
        icon:'',
        variant:''
    }
}

const FultechsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case FultechsActionTypes.SET_ACTIVE_PAGE:
            return{
                ...state,
                activePage:action.activePage
            }
        case FultechsActionTypes.SHOW_MODAL_ALERT:
            return{
                ...state,
                modalAlert:{...state.modalAlert, 
                    show:'show', 
                    message:action.message, 
                    icon:action.icon,
                    variant:action.variant
                }
            }
        case FultechsActionTypes.HIDE_MODAL_ALERT:
            return{
                ...state,
                modalAlert:{...state.modalAlert, 
                    show:'hide',
                }
            }
    
        default:
            return state;
    }
}

export default FultechsReducer;