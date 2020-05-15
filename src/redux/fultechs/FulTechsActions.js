import FultechsActionTypes from './FultechsTypes';

// Set Active Page
export const setActivePage = activePage =>({
    type: FultechsActionTypes.SET_ACTIVE_PAGE,
    activePage
})

export const setActivePageAttempt = (activePage)=>{
    return dispatch =>{
        dispatch(setActivePage(activePage));
    }
}

// Show Modal Alert
export const showModalAlert = (variant, icon, message) =>({
    type: FultechsActionTypes.SHOW_MODAL_ALERT,
    variant,
    icon,
    message
})

export const hideModalAlert = () =>({
    type: FultechsActionTypes.HIDE_MODAL_ALERT
})

export const showModalAlertAttempt = (variant, icon, message)=>{
    return dispatch =>{
        dispatch(showModalAlert(variant, icon, message));
        setTimeout(() => {
            dispatch(hideModalAlert())
        }, 4000);
    }
}

