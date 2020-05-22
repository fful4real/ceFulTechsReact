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

// set redirect link


export const setRedirectLink = redirectLink =>({
    type: FultechsActionTypes.SET_REDIRECT_LINK,
    redirectLink
})

export const setRedirectLinkAttempt = redirectlink =>{
    return dispatch =>{
        dispatch(setRedirectLink(redirectlink));
    }
}
// set active Page


export const setCurrentPage = currentPage =>({
    type: FultechsActionTypes.SET_CURRENT_PAGE,
    currentPage
})

export const setCurrentPageAttempt = currentPage =>{
    return dispatch =>{
        dispatch(setCurrentPage(currentPage));
    }
}
// set is App loaded

export const setAppLoaded = () =>({
    type: FultechsActionTypes.SET_IS_APP_LOADED
})

export const setAppLoadedAttempt = () =>{
    return dispatch =>{
        dispatch(setAppLoaded());
    }
}

