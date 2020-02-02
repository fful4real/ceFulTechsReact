import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import CurrenciesActionTypes from "./currencies.types";


export const fetchCurrenciesStart = ()=>({
    type: CurrenciesActionTypes.CURRENCIES_FETCHING_START
})
export const fetchCurrenciesSuccess = currencies =>({
    type: CurrenciesActionTypes.CURRENCIES_FETCHING_SUCCESS,
    currencies
})
export const fetchCurrenciesFailure = error =>({
    type: CurrenciesActionTypes.CURRENCIES_FETCHING_FAILURE,
    error
})

export const fetchCurrenciesAsync = ()=>{

    return dispatch =>{
        dispatch(fetchCurrenciesStart());
        AxiosAgent.request('get',API_ROUTES.currencies(null), null, null)
        .then(resp => {
            dispatch(fetchCurrenciesSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}