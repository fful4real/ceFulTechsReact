import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import BanksActionTypes from "./BanksTypes";

// Fetch banks 
export const fetchBanksStart = ()=>({
    type: BanksActionTypes.BANKS_FETCHING_START
})
export const fetchBanksSuccess = banks =>({
    type: BanksActionTypes.BANKS_FETCHING_SUCCESS,
    banks
})
export const fetchBanksFailure = error =>({
    type: BanksActionTypes.BANKS_FETCHING_FAILURE,
    error
})

export const fetchBanksAsync = ()=>{

    return dispatch =>{
        dispatch(fetchBanksStart());
        AxiosAgent.request('get',API_ROUTES.banks(null), null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchBanksSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Update Account type

export const updateBanks = banks =>({
    type: BanksActionTypes.UPDATE_BANKS,
    banks
})

export const updateBanksAsync = banks =>{

    return dispatch =>{
        dispatch(updateBanks(banks));
    }
}
