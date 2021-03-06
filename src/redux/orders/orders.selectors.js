import {createSelector} from 'reselect'
import { numberWithCommas, capitalizeFirstLetter} from '../../helpers/helper';
import moment from 'moment';
import { selectUser } from '../user/user.selectors';

export const selectOrderState = state => state.orders;
const selectCitiesState = state => state.cities;
const selectUserState = state => state.user;

const selectCities = createSelector(
    [selectCitiesState],
    cities => cities.cities
)

export const selectOrders = createSelector(
    [selectOrderState, selectCities],
    (orders, cities) => orders.orders.map(order=>(
        {...order,
            customer: {...order.customer,
                 firstName:capitalizeFirstLetter(order.customer.firstName), 
                 lastName: order.customer.lastName.toUpperCase()
                },
            sentBy: order.sentBy?{
                ...order.sentBy,
                firstName:capitalizeFirstLetter(order.sentBy.firstName),
                lastName: order.sentBy.lastName.toUpperCase()
            }:''
        }
    ))
)

export const selectIsFetchingOrders = createSelector(
    [selectOrderState],
    orders => orders.isFetching
)

// Total Orders Selectors
export const selectTotalOrders = createSelector(
    [selectOrderState],
    orderState =>  orderState.totalOrders
);



// All orders selector
export const selectAllOrders = createSelector(
    [selectOrderState],
    orderState =>  orderState.allOrders
);

// Orders Count
export const selectOrdersCount = createSelector(
    [selectOrders],
    orders =>  orders.length
);

export const selectOrdersTotalAmount = createSelector(
    [selectOrders],
    orders => {
       const amount = orders.reduce((totalAmount,order)=>totalAmount+=parseInt(order.amountOut),0);

       return numberWithCommas(amount)
    }
)

export const selectLastTenOrders = createSelector(
    [selectOrders],
    orders => orders.slice(0,10).map(order=>({...order,
        amountIn:numberWithCommas(order.amountIn)
    }))
    
)


export const isFechingOrderItemOrderEntries = createSelector(
    [selectOrderState, selectUserState],
    (orders, user) => orders.isFechingOrderItemOrderEntries
)

export const selectMonthsOrders = createSelector(
    [selectAllOrders],
    orders => orders.filter(order=>{
        const orderDate = new Date(order.datec);
        const currentDate = new Date();

        return (orderDate.getMonth()===currentDate.getMonth())
        && (orderDate.getYear()===currentDate.getYear())
    })
)

// Count Orders Of The Month Selectors
export const selectOrderCountOfMonth = createSelector(
    [selectMonthsOrders],
    orders => orders.length
)

// Amount for Orders Of The Month Selectors
export const selectAmountForMonthOrders = createSelector(
    [selectMonthsOrders],
    orders => orders.reduce((totalAmount, order)=>totalAmount+order.amountOut,0)
);

// Selectors for Pending orders
export const selectIsFetchingPendingOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.isFetchingPendingOrders
)
export const selectPendingOrders = createSelector(
    [selectOrderState],
    orderState => orderState.pendingOrders
)
export const selectPendingOrdersCount = createSelector(
    [selectPendingOrders],
    pendingOrders => pendingOrders.length
)



export const selectHasFetchedPendingOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.hasFetchedPendingOrders
)

export const selectPendingOrdersAmount = createSelector(
    [selectPendingOrders],
    pendingOrders=>{
        const amountPending = pendingOrders.reduce((pendingAmount,order)=>pendingAmount+=parseInt(order.pendingAmount),0)

        return numberWithCommas(amountPending)
    }
);

// Selectors for Processed orders
export const selectIsFetchingProcessedOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.isFetchingProcessedOrders
)
export const selectProcessedOrdersCount = createSelector(
    [selectOrderState],
    ordersState => ordersState.processedOrders.length
)

export const selectHasFetchedProcessedOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.hasFetchedProcessedOrders
)

export const selectProcessedOrdersAmount = createSelector(
    [selectOrderState],
    orderState=>{
        const amountProcessed = orderState.processedOrders.reduce((processedAmount,order)=>processedAmount+=parseInt(order.processedAmount),0)

        return numberWithCommas(amountProcessed)
    }
);

// Selectors for New orders
export const selectIsFetchingNewOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.isFetchingNewOrders
)

export const selectNewOrders = createSelector(
    [selectOrderState],
    orderState => orderState.newOrders
)
export const selectNewOrdersCount = createSelector(
    [selectNewOrders],
    newOrders => newOrders.length
)

export const selectHasFetchedNewOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.hasFetchedNewOrders
)

export const selectNewOrdersAmount = createSelector(
    [selectOrderState],
    orderState=>{
        const amountNew = orderState.newOrders.reduce((processedAmount,order)=>processedAmount+=parseInt(order.amountOut),0)

        return numberWithCommas(amountNew)
    }
);

// Orders Table Data
export const selectOrdersTableData = createSelector(
    [selectOrders],
    (orders)=>orders.map(order=>({...order,
        datec:moment(order.datec).format("DD - MMM - YYYY"),
        amountIn:numberWithCommas(order.amountIn),
        amountOut:numberWithCommas(order.amountOut)
    }))
)

// Select Orders Current Page
export const selectOrdersCurrentPage = createSelector(
    [selectOrderState],
    ordersState => ordersState.currentPage
)


// Select Is Fetching Orders Page
export const selectIsFetchingOrdersPage = createSelector(
    [selectOrderState],
    ordersState => ordersState.isFetchingOrdersPage
)

// should I fetch a new page

export const selectShouldFetchOrderPage = createSelector(
    [selectOrderState],
    ordersState => ordersState.shouldFetchPage
)

// should I fetch a new page

export const selectOdersTotalPages = createSelector(
    [selectOrderState],
    ordersState => ordersState.totalPages
)

// select Orders Per Page
export const selectOrdersPerPage = createSelector(
    [selectOrderState],
    ordersState => ordersState.ordersPerPage
)

// Select is fetching all orders
export const selectIsFetchingAllOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.isFetchingAllOrders
)

// Select Not Completeed orders
export const selectNotCompletedOrders = createSelector(
    [selectPendingOrders, selectNewOrders],
    (pendingOrders, newOrders)=>[...pendingOrders, ...newOrders]
)

// Select Not Completed Orders Count
export const selectNotCompletedOrdersCount = createSelector(
    [selectNotCompletedOrders],
    orders => orders.length
)

// Select Not Completed Orders Amount
export const selectNotCompletedOrdersAmount = createSelector(
    [selectNotCompletedOrders],
    orders => orders.reduce((totalAmount, order)=>totalAmount+order.pendingAmount,0)
)

// Select is order from customer
export const selectIsOrderFromCustomer = createSelector(
    [selectOrderState],
    ordersState => ordersState.isOrderFromCustomer
)

//Seelect order modal
export const selectOrderModalObject = createSelector(
    [selectOrderState],
    ordersState => ordersState.ordersModal
)

//Seelect orders processed by current user
export const selectOrdersProcessedByUser = createSelector(
    [selectOrders, selectUser],
    (orders, user) => {
        const OrdersProcessedByUser = orders.filter(order=>{
            if (order.processedBy) {
                return order.processedBy.id===user.id?true:false
            }
            return false
        })
        
        return OrdersProcessedByUser
    }
)

//Seelect count orders processed by current user
export const selectOrdersProcessedByUserCount = createSelector(
    [selectOrdersProcessedByUser],
    orders => orders.length
)



//Seelect orders created by current user
export const selectOrdersCreatedByUser = createSelector(
    [selectOrders, selectUser],
    (orders, user) => {
        const OrdersCreatedByUser = orders.filter(order=>{
            if (order.createdBy) {
                return order.createdBy.id===user.id?true:false
            }
            return false
        })
        
        return OrdersCreatedByUser
    }
)

//Seelect highest value order processed by current user
export const selectHighestProcessedOrderByUser = createSelector(
    [selectOrdersProcessedByUser],
    orders => {
        orders = orders.filter(order=>order.currencyOut.currencyCode==="XAF")
        let highestOrder = null
        if (orders.length) {
            orders.map(order=>{
                if (highestOrder) {
                    highestOrder = highestOrder.amountOut>order.amountOut?highestOrder:order
                }else{
                    highestOrder = order
                }
                return order
            })
        }

        return highestOrder
    }
)


//Seelect least value order processed by current user
export const selectLeastProcessedOrderByUser = createSelector(
    [selectOrdersProcessedByUser],
    orders => {
        orders = orders.filter(order=>order.currencyOut.currencyCode==="XAF")
        let leastOrder = null
        if (orders.length) {
            orders.map(order=>{
                if (leastOrder) {
                    leastOrder = leastOrder.amountOut<order.amountOut?leastOrder:order
                }else{
                    leastOrder = order
                }
                return order
            })
        }

        return leastOrder
    }
)

//Seelect orders processed by current user
export const selectOrdersAbandonedByUser = createSelector(
    [selectOrders, selectUser],
    (orders, user) => {
        const OrdersAbandonedByUser = orders.filter(order=>{
            if (order.abandonedBy) {
                return order.abandonedBy.id===user.id?true:false
            }
            return false
        })
        
        return OrdersAbandonedByUser
    }
)

// Select orders per month
export const selectOrdersPerMonth = createSelector(
    [selectOrders],
    orders =>{
        let ordersPermonth = {}
        orders.map(order=>{
            const orderDate = new Date(order.datec);

            if (ordersPermonth[`month_${orderDate.getMonth()+1}`]) {
                ordersPermonth[`month_${orderDate.getMonth()+1}`]+=1;
            }else{
                ordersPermonth[`month_${orderDate.getMonth()+1}`]=1
            }

            return order
        })
        // console.log(ordersPermonth)

        return Object.values(ordersPermonth).reverse()
    }
)

