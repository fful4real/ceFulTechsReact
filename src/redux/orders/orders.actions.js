import AxiosAgent from "../../axios-agent";
import OrdersActionTypes from "./orders.types";
import API_ROUTES from "../../api-route";

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

export const updateOrderAsync = orders =>{

    return dispatch =>{
        dispatch(updateOrder(orders));
    }
}

// Fetch Order Entries

export const fetchOrderItemOrderEntriesStart = ()=>({
    type: OrdersActionTypes.ORDER_ITEM_ORDER_ENTRIES_FETCHING_START
})

export const fetchOrderItemOrderEntriesSuccess = (order)=>({
    type: OrdersActionTypes.ORDER_ITEM_ORDER_ENTRIES_FETCHING_SUCCESS,
    order
})

export const fetchOrderItemOrderEntriesFailure = (error)=>({
    type: OrdersActionTypes.ORDER_ITEM_ORDER_ENTRIES_FETCHING_FAILURE,
    error
})

export const fetchOrderItemOrderEntriesAsync = order =>{
    return dispatch =>{
        dispatch(fetchOrderItemOrderEntriesStart)
        AxiosAgent.request('get', API_ROUTES.orderItemOrderEntries(encodeURI(`/api/ce_orders/${order.id}`)),null,null)
                .then(resp =>{
                        // console.log(resp.data['hydra:member'])
                        const orderEntries = resp.data['hydra:member']
                        dispatch(fetchOrderItemOrderEntriesSuccess({...order, orderEntries}))
                    }
                )
                .catch(error=>console.error(error.message))
    }
}

// Fetch Latest Order Entry

export const fetchOrderItemLatestOrderEntryStart = ()=>({
    type: OrdersActionTypes.ORDER_ITEM_LATEST_ORDER_ENTRY_FETCHING_START
})

export const fetchOrderItemLatestOrderEntrySuccess = order =>({
    type: OrdersActionTypes.ORDER_ITEM_LATEST_ORDER_ENTRY_FETCHING_SUCCESS,
    order
})

export const fetchOrderItemLatestOrderEntryFailure = (error)=>({
    type: OrdersActionTypes.ORDER_ITEM_LATEST_ORDER_ENTRY_FETCHING_FAILURE,
    error
})

export const fetchOrderItemLatestOrderEntryAsync = order =>{
    return dispatch =>{
        dispatch(fetchOrderItemLatestOrderEntryStart)
        AxiosAgent.request('get', API_ROUTES.orderItemOrderEntries(encodeURI(`/api/ce_orders/${order.id}`)),null,null)
                .then(resp =>{
                        // console.log(resp.data['hydra:member'])
                        const orderEntry = resp.data['hydra:member'][0]
                        order = {...order,
                            orderEntries:[orderEntry,...order.orderEntries]
                        }
                        console.log('Latest Order Entry: ', orderEntry)
                        console.log('Order for Latest order entry: ', order)
                        dispatch(fetchOrderItemLatestOrderEntrySuccess(order))
                    }
                )
                .catch(error=>console.error(error.message))
    }
}