import AxiosAgent from "../../axios-agent";
import CustomersActionTypes from "./customers.types";
import API_ROUTES from "../../api-route";


export const fetchCustomersStart = ()=>({
    type: CustomersActionTypes.CUSTOMERS_FETCHING_START
})
export const fetchCustomersSuccess = customers =>({
    type: CustomersActionTypes.CUSTOMERS_FETCHING_SUCCESS,
    customers
})
export const fetchCustomersFailure = error =>({
    type: CustomersActionTypes.CUSTOMERS_FETCHING_FAILURE,
    error
})

export const fetchCustomersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchCustomersStart());
        AxiosAgent.request('get',API_ROUTES.customers(null), null, null)
        .then(resp => {
            dispatch(fetchCustomersSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}