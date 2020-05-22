import AxiosAgent from "../../axios-agent";
import AccountEntriesActionTypes from "./AccountEntriesTypes";


// Fetch All AccountEntries Entries
export const fetchAllAccountEntriesStart = ()=>({
    type:AccountEntriesActionTypes.ALL_ACCOUNT_ENTRIES_FETCHING_START
})
export const fetchAllAccountEntriesSuccess = accountEntries =>({
    type: AccountEntriesActionTypes.ALL_ACCOUNT_ENTRIES_FETCHING_SUCCESS,
    accountEntries
})
export const fetchAllAccountEntriesFailure = err =>({
    type: AccountEntriesActionTypes.ALL_ACCOUNT_ENTRIES_FETCHING_FAILURE,
    payload: err
})

export const fetchAllAccountEntriesAsync = ()=>{

    return dispatch =>{
        dispatch(fetchAllAccountEntriesStart());
        AxiosAgent.request('get','account_entries?pagination=0', null, null)
        .then(resp => {
            console.log(resp.data)
            dispatch(fetchAllAccountEntriesSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}