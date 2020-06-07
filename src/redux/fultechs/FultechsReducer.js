import FultechsActionTypes from "./FultechsTypes";



export const FULTECHS_INITIAL_STATE = {
    itemsPerPage:10,
    currentPage:1,
    activePage:'dashboard',
    isRefreshing:false,
    refreshTimeInterval:40000,
    modalAlert: {
        show:'hide',
        message: '',
        icon:'',
        variant:''
    },
    redirectLink:null,
    isAppLoaded: false,
    notificationIcons: {
        customer: {
            icon: 'account-o',
            link: 'customers/list',
            className: 'avatar-text-primart'
        },
        ceorder: {
            icon: 'assignment-o',
            link: 'orders/new',
            className: 'avatar-text-success'
        },
        ceaccount: {
            icon:'money-box',
            link:'accounts/list',
            className: 'avatar-text-danger'
        }
    }
}

const FultechsReducer = (state=FULTECHS_INITIAL_STATE,action)=>{
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
        case FultechsActionTypes.SET_REDIRECT_LINK:
            return{
                ...state,
                redirectLink:action.redirectLink
            }
        case FultechsActionTypes.SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage:action.currentPage
            }
        case FultechsActionTypes.SET_IS_APP_LOADED:
            return{
                ...state,
                isAppLoaded:true
            }
    
        default:
            return state;
    }
}

export default FultechsReducer;