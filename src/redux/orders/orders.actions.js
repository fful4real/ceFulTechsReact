import OrderActionTypes from "./orders.types";
import OrdersActionTypes from "../../layout/content/orders/orders.types";
import AxiosAgent from "../../axios-agent";

export const addOrderToState = order =>({
    type: OrderActionTypes.CREATE_ORDER,
    order
});

export const fetchOrdersStart = ()=>({
    type: OrdersActionTypes.FETCH_ORDERS_START
})
export const fetchOrdersSuccess = orders =>({
    type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders
})
export const fetchOrdersFailure = response =>({
    type: OrdersActionTypes.FETCH_ORDERS_FAILURE,
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