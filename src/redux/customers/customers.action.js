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

export const addCustomersOrder = customers =>({
    type: CustomersActionTypes.CUSTOMERS_ADD_CUSTOMER_ORDER,
    customers
})

export const addCustomerOrders = (customers, order)=>{
    return dispatch=>{

        const updatedCustomers = customers.map(customer=>{
            return parseInt(customer.mobileNumber) === parseInt(order.receiverNumber) ? 
            {...customer, CustomersOrder:customer.CustomersOrders.push(`/api/ce_orders/${order.id}`)}:customer
        })

        const hasCustomer = customers.filter(customer=>parseInt(customer.mobileNumber) === parseInt(order.receiverNumber))
        if(!hasCustomer.length)
        AxiosAgent.request('get',API_ROUTES.customerNumber(order.receiverNumber),null,null)
            .then(resp => console.log(resp.data['hydra:member']))
            .catch(error=>console.error(error.message))
            
        dispatch(addCustomersOrder(updatedCustomers))
    }

}

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