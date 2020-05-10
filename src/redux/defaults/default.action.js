import DefaultParamsActionTypes from './default.types'

// Set Active Page
export const setActivePage = activePage =>({
    type: DefaultParamsActionTypes.SET_ACTIVE_PAGE,
    activePage
})

export const setActivePageAttempt = (activePage)=>{
    return dispatch =>{
        dispatch(setActivePage(activePage));
    }
}