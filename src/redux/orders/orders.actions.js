import AxiosAgent from "../../axios-agent";
import OrdersActionTypes from "./orders.types";
import API_ROUTES from "../../api-route";
import { capitalizeFirstLetter } from "../../helpers/helper";

export const addOrderToState = order =>({
    type: OrdersActionTypes.CREATE_ORDER,
    order
});
// Fetch Ordres
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
            // console.log(resp.data)
            dispatch(fetchOrdersSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Fetch All Ordres
export const fetchAllOrdersStart = ()=>({
    type:OrdersActionTypes.ALL_ORDERS_FETCHING_START
})
export const fetchAllOrdersSuccess = orders =>({
    type: OrdersActionTypes.ALL_ORDERS_FETCHING_SUCCESS,
    orders
})
export const fetchAllOrdersFailure = err =>({
    type: OrdersActionTypes.ALL_ORDERS_FETCHING_FAILURE,
    payload: err
})

export const fetchAllOrdersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchAllOrdersStart());
        AxiosAgent.request('get','ce_orders?pagination=0', null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchAllOrdersSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Fetch Pending Orders
export const fetchPendingOrdersStart = ()=>({
    type:OrdersActionTypes.PENDING_ORDERS_FETCHING_START
})
export const fetchPendingOrdersSuccess = orders =>({
    type: OrdersActionTypes.PENDING_ORDERS_FETCHING_SUCCESS,
    orders
})
export const fetchPendingOrdersFailure = response =>({
    type: OrdersActionTypes.PENDING_ORDERS_FETCHING_FAILURE,
    payload: response
})

export const fetchPendingOrdersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchPendingOrdersStart());
        AxiosAgent.request('get',`ce_orders?${encodeURI('status.statusCode=PTL&pagination=0')}`, null, null)
        .then(resp => {
            // console.log("Pending Orders: ",resp.data)
            dispatch(fetchPendingOrdersSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Fetch Processed Orders
export const fetchProcessedOrdersStart = ()=>({
    type:OrdersActionTypes.PROCESSED_ORDERS_FETCHING_START
})
export const fetchProcessedOrdersSuccess = orders =>({
    type: OrdersActionTypes.PROCESSED_ORDERS_FETCHING_SUCCESS,
    orders
})
export const fetchProcessedOrdersFailure = response =>({
    type: OrdersActionTypes.PROCESSED_ORDERS_FETCHING_FAILURE,
    payload: response
})

export const fetchProcessedOrdersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchProcessedOrdersStart());
        AxiosAgent.request('get',`ce_orders?${encodeURI('status.statusCode=OK&pagination=0')}`, null, null)
        .then(resp => {
            // console.log("Processed Orders: ",resp.data)
            dispatch(fetchProcessedOrdersSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Fetch New Orders
export const fetchNewOrdersStart = ()=>({
    type:OrdersActionTypes.NEW_ORDERS_FETCHING_START
})
export const fetchNewOrdersSuccess = orders =>({
    type: OrdersActionTypes.NEW_ORDERS_FETCHING_SUCCESS,
    orders
})
export const fetchNewOrdersFailure = response =>({
    type: OrdersActionTypes.NEW_ORDERS_FETCHING_FAILURE,
    payload: response
})

export const fetchNewOrdersAsync = ()=>{

    return dispatch =>{
        dispatch(fetchNewOrdersStart());
        AxiosAgent.request('get',`ce_orders?${encodeURI('status.statusCode=NEW&pagination=0')}`, null, null)
        .then(resp => {
            // console.log("New Orders: ",resp.data)
            dispatch(fetchNewOrdersSuccess(resp.data))
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
                        // console.log('Latest Order Entry: ', orderEntry)
                        // console.log('Order for Latest order entry: ', order)
                        dispatch(fetchOrderItemLatestOrderEntrySuccess(order))
                    }
                )
                .catch(error=>console.error(error.message))
    }
}

// Fetch Orders Page

export const fetchOrdersPageStart = ()=>({
    type: OrdersActionTypes.ORDERS_PAGE_FETCHING_START
})

export const fetchOrdersPageSuccess = orders =>({
    type: OrdersActionTypes.ORDERS_PAGE_FETCHING_SUCCESS,
    orders
})

export const fetchOrdersPageFailure = (error)=>({
    type: OrdersActionTypes.ORDERS_PAGE_FETCHING_FAILURE,
    error
})

export const fetchOrdersPageAsync = page =>{
    return dispatch =>{
        dispatch(fetchOrdersPageStart)
        AxiosAgent.request('get',`ce_orders?_page=${page}`, null, null)
        .then(resp => {
            // console.log("Order Page: ",resp.data)
            const fetchedOrders = resp.data['hydra:member'].map(fetchedOrder=>({
                ...fetchedOrder,
                customer: {
                    ...fetchedOrder.customer,
                    firstName: capitalizeFirstLetter(fetchedOrder.customer.firstName),
                    lastName: fetchedOrder.customer.lastName.toUpperCase()
                }
            }))
            dispatch(fetchOrdersPageSuccess(fetchedOrders))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Set Orders Current Page
export const setOrdersCurrentPage = page => ({
    type: OrdersActionTypes.SET_ORDERS_PAGE,
    page
})

export const setOrdersCurrentPageAsync =  page =>{
    return dispatch =>{
        dispatch(setOrdersCurrentPage(page))
    }
}

// Set Should Fetch Orders Page
export const setShouldFetchOrderPage = fetchPage => ({
    type: OrdersActionTypes.SET_SHOULD_FETCH_PAGE,
    fetchPage
})

export const setShouldFetchOrderPageAsync =  () =>{
    return dispatch =>{
        dispatch(setShouldFetchOrderPage(true))
    }
}

// Set is order from customer
// Set Should Fetch Orders Page
export const setOrderFromCustomer = orderFromCustomer => ({
    type: OrdersActionTypes.SET_ORDER_FROM_CUSTOMER,
    orderFromCustomer
})

export const setOrderFromCustomerAttempt =  orderFromCustomer =>{
    return dispatch =>{
        dispatch(setOrderFromCustomer(orderFromCustomer))
    }
}