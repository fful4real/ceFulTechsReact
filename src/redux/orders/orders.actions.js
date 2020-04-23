import AxiosAgent from "../../axios-agent";
import OrdersActionTypes from "./orders.types";

export const addOrderToState = order =>({
    type: OrdersActionTypes.CREATE_ORDER,
    order
});

export const fetchOrdersStart = ()=>({
    type:OrdersActionTypes.ORDERS_FETCHING_START
})
export const fetchOrdersSuccess = orders =>({
    type: OrdersActionTypes.ORDERS_FETCHING_SUCCESS,
    orders
})
export const fetchOrdersFailure = response =>({
    type: OrdersActionTypes.ORDERS_FETCHING_FAILURE,
    payload: response
})

export const fetchOrdersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchOrdersStart());
        AxiosAgent.request('get','ce_orders', null, null)
        .then(resp => {
            dispatch(fetchOrdersSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

export const dispatchAddOrderToState = order =>{

    return dispatch =>{
        dispatch(addOrderToState(order));
    }
}

// Update Order after processing

export const updateOrder = orders =>({
    type: OrdersActionTypes.UPDATE_ORDERS,
    orders
})

<<<<<<< HEAD
export const updateOrderAsync = (orders) =>{
=======
export const updateOrderAsync = orders =>{
>>>>>>> b17fb8b

    return dispatch =>{
        dispatch(updateOrder(orders));
    }
}