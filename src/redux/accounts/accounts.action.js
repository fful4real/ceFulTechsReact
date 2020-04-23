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
            dispatch(fetchAccountsSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
<<<<<<< HEAD
=======
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
>>>>>>> b17fb8b
}