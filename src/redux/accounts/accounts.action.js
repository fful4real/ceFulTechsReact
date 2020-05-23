import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import AccountsActionTypes from "./accounts.types";


export const fetchAccountsStart = ()=>({
    type: AccountsActionTypes.ACCOUNTS_FETCHING_START
})
export const fetchAccountsSuccess = accounts =>({
    type: AccountsActionTypes.ACCOUNTS_FETCHING_SUCCESS,
    accounts
})
export const fetchAccountsFailure = error =>({
    type: AccountsActionTypes.ACCOUNTS_FETCHING_FAILURE,
    error
})

export const fetchAccountsAsync = ()=>{

    return dispatch =>{
        dispatch(fetchAccountsStart());
        AxiosAgent.request('get',API_ROUTES.accounts(null), null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchAccountsSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Update Order after processing

export const updateAccount = accounts =>({
    type: AccountsActionTypes.UPDATE_ACCOUNTS,
    accounts
})

export const updateAccountAsync = (accounts) =>{

    return dispatch =>{
        dispatch(updateAccount(accounts));
    }
}

// Set show accounts Modal

export const setShowAccountsModal = show =>({
    type: AccountsActionTypes.SET_SHOW_ACCOUNTS_MODAL,
    show
})

export const setShowAccountsModalAttempt = (show) =>{

    return dispatch =>{
        dispatch(setShowAccountsModal(show));
    }
}

// Set accounts modal heading

export const setAccountsModalHeading = heading =>({
    type: AccountsActionTypes.SET_ACCOUNTS_MODAL_HEADING,
    heading
})

export const setAccountsModalHeadingAttempt = (heading) =>{

    return dispatch =>{
        dispatch(setAccountsModalHeading(heading));
    }
}

// Set accounts modal body

export const setAccountsModalbody = body =>({
    type: AccountsActionTypes.SET_ACCOUNTS_MODAL_BODY,
    body
})

export const setAccountsModalbodyAttempt = (body) =>{

    return dispatch =>{
        dispatch(setAccountsModalbody(body));
    }
}

// Close accounts Modal
export const closeAccountsModal = () =>({
    type:AccountsActionTypes.SET_CLOSE_ACCOUNTS_MODAL
})
export const closeAccountsModalAttempt = () =>{
    return dispatch =>{
        dispatch(closeAccountsModal())
    }
}

// Fetch All Accounts
export const fetchAllAccountsStart = ()=>({
    type:AccountsActionTypes.ALL_ACCOUNTS_FETCHING_START
})
export const fetchAllAccountsSuccess = accounts =>({
    type: AccountsActionTypes.ALL_ACCOUNTS_FETCHING_SUCCESS,
    accounts
})
export const fetchAllAccountsFailure = err =>({
    type: AccountsActionTypes.ALL_ACCOUNTS_FETCHING_FAILURE,
    payload: err
})

export const fetchAllAccountsAsync = ()=>{

    return dispatch =>{
        dispatch(fetchAllAccountsStart());
        AxiosAgent.request('get','ce_accounts?pagination=0', null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchAllAccountsSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Set receiving account

export const setReceivingAccount = id =>({
    type: AccountsActionTypes.SET_RECEIVING_ACCOUNT,
    id
})

export const setReceivingAccountAttempt = (id) =>{

    return dispatch =>{
        dispatch(setReceivingAccount(id));
    }
}