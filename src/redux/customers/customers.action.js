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

export const addCustomer = customer =>({
    type: CustomersActionTypes.CUSTOMERS_ADD_CUSTOMER,
    customer
})

export const addCustomersOrder = customers =>({
    type: CustomersActionTypes.CUSTOMERS_ADD_CUSTOMER_ORDER,
    customers
})

export const addCustomerToState = customer =>{
    return dispatch =>dispatch(addCustomer(customer))
}

export const addOrderToCustomer = (customers, order)=>{
    return dispatch=>{

        const updatedCustomers = customers.map(customer=>{
            return parseInt(customer.mobileNumber) === parseInt(order.receiverNumber) ? 
            {...customer, 
                CustomersOrder:customer.CustomersOrders.push(order)}:customer
        })

        // console.log('Customers: ',customers)

        const hasCustomer = customers.filter(customer=>parseInt(customer.mobileNumber) === parseInt(order.receiverNumber))
        if(!hasCustomer.length){
            AxiosAgent.request('get',API_ROUTES.customerNumber(order.receiverNumber),null,null)
                .then(resp => dispatch(addCustomer(resp.data['hydra:member'][0])))
                .catch(error=>console.error(error.message))
        }else{
            dispatch(addCustomersOrder(updatedCustomers))
        }
    }

}

export const fetchCustomersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchCustomersStart());
        AxiosAgent.request('get',API_ROUTES.customers(null), null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchCustomersSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}


// Fetch All Customers
export const fetchAllCustomersStart = ()=>({
    type:CustomersActionTypes.ALL_CUSTOMERS_FETCHING_START
})
export const fetchAllCustomersSuccess = customers =>({
    type: CustomersActionTypes.ALL_CUSTOMERS_FETCHING_SUCCESS,
    customers
})
export const fetchAllCustomersFailure = err =>({
    type: CustomersActionTypes.ALL_CUSTOMERS_FETCHING_FAILURE,
    payload: err
})

export const fetchAllCustomersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchAllCustomersStart());
        AxiosAgent.request('get','customers?pagination=0', null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchAllCustomersSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Set customer page modal to display
export const setCustomerModal = modal =>({
    type:CustomersActionTypes.SET_CUSTOMER_MODAL,
    modal
})
export const setCustomerModalAsync = modal =>{
    return dispatch =>{
        dispatch(setCustomerModal(modal))
    }
}

// Set closing customer modal
export const closeCustomerModal = () =>({
    type:CustomersActionTypes.CLOSE_CUSTOMER_MODAL,
})
export const setCloseCustomerModal = () =>{
    return dispatch =>{
        dispatch(closeCustomerModal())
    }
}

// Set Current Customer
export const setCurrentCustomer = (customerId) =>({
    type:CustomersActionTypes.SET_CURRENT_CUSTOMER,
    customerId
})
export const setCurrentCustomerAttempt = (customerId) =>{
    return dispatch =>{
        dispatch(setCurrentCustomer(customerId))
    }
}

// Set Current Customer
export const setCustomerModalHeading = (heading) =>({
    type:CustomersActionTypes.SET_CUSTOMER_MODAL_HEADING,
    heading
})
export const setCustomerModalHeadingAttempt = (heading) =>{
    return dispatch =>{
        dispatch(setCustomerModalHeading(heading))
    }
}

// Update existing customer
export const updateCustomer = customer =>({
    type: CustomersActionTypes.UPDATE_CUSTOMER,
    customer
})

export const updateCustomerAttempt = (customer) =>{
        
    return dispatch =>dispatch(updateCustomer(customer))
}

// Delete customer
export const deleteCustomer = customer =>({
    type: CustomersActionTypes.DELETE_CUSTOMER,
    customer
})

export const deleteCustomerAttempt = (customer) =>{
    return dispatch =>dispatch(deleteCustomer(customer))
}

