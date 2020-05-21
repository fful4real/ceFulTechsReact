import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import AccountTypesActionTypes from "./AccountTypesTypes";

// Fetch accountTypes 
export const fetchAccountTypesStart = ()=>({
    type: AccountTypesActionTypes.ACCOUNT_TYPES_FETCHING_START
})
export const fetchAccountTypesSuccess = accountTypes =>({
    type: AccountTypesActionTypes.ACCOUNT_TYPES_FETCHING_SUCCESS,
    accountTypes
})
export const fetchAccountTypesFailure = error =>({
    type: AccountTypesActionTypes.ACCOUNT_TYPES_FETCHING_FAILURE,
    error
})

export const fetchAccountTypesAsync = ()=>{

    return dispatch =>{
        dispatch(fetchAccountTypesStart());
        AxiosAgent.request('get',API_ROUTES.accountTypes(null), null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchAccountTypesSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Update Account type

export const updateAccountTypes = accountTypes =>({
    type: AccountTypesActionTypes.UPDATE_ACCOUNT_TYPES,
    accountTypes
})

export const updateAccountTypesAsync = accountTypes =>{

    return dispatch =>{
        dispatch(updateAccountTypes(accountTypes));
    }
}
