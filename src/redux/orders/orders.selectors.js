import {createSelector} from 'reselect'
import { numberWithCommas, capitalizeFirstLetter, formatDate } from '../../helpers/helper';
import moment from 'moment';


const selectOrderState = state => state.orders;
const selectCitiesState = state => state.cities;
const selectCities = createSelector(
    [selectCitiesState],
    cities => cities.cities
)

export const selectOrders = createSelector(
    [selectOrderState, selectCities],
    (orders, cities) => orders.orders.map(order=>(
        {...order,
            customer: {...order.customer,
                 fkCity:typeof order.customer.fkCity !== 'object'? cities.filter(city=>parseInt(city.id)===parseInt(order.customer.fkCity.split("/")[3]))[0]:order.customer.fkCity,
                 firstName:capitalizeFirstLetter(order.customer.firstName), 
                 lastName: order.customer.lastName.toUpperCase()
                }
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
    orderState =>  orderState.allOrders.map(order=>formatDate(order,'datec'))
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
        datec:moment(order.datec).format("DD - MMM - YYYY"),
        amountIn:numberWithCommas(order.amountIn)
    }))
    
)


export const isFechingOrderItemOrderEntries = createSelector(
    [selectOrderState],
    orders => orders.isFechingOrderItemOrderEntries
)


// Count Orders Of The Month Selectors
export const selectOrderCountOfMonth = createSelector(
    [selectOrders],
    orders => {
        const numberOfOrdersForMonth = orders.reduce(
            (totalOrders,order)=>{
                const orderDate = new Date(order.datec);
                const currentDate = new Date();

                if((orderDate.getMonth()===currentDate.getMonth())
                    && (orderDate.getYear()===currentDate.getYear())
                    ){
                    // console.log("Order ID: ",order.id)
                    return totalOrders+1;
                }

                return totalOrders;
            }
            
            ,0);
 
        return numberOfOrdersForMonth
     }
);

// Ampunt for Orders Of The Month Selectors
export const selectAmountForMonthOrders = createSelector(
    [selectOrders],
    orders => {
        const amountOfOrdersForMonth = orders.reduce(
            (totalAmount,order)=>{
                const orderDate = new Date(order.datec);
                const currentDate = new Date();

                if((orderDate.getMonth()===currentDate.getMonth())
                    && (orderDate.getYear()===currentDate.getYear())
                    ){
                    // console.log("Order ID: ",order.id)
                    return totalAmount+order.amountOut;
                }

                return totalAmount;
            }
            
            ,0);
 
        return numberWithCommas(amountOfOrdersForMonth)
     }
);

// Selectors for Pending orders
export const selectIsFetchingPendingOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.isFetchingPendingOrders
)
export const selectPendingOrdersCount = createSelector(
    [selectOrderState],
    ordersState => ordersState.pendingOrders.length
)

export const selectHasFetchedPendingOrders = createSelector(
    [selectOrderState],
    ordersState => ordersState.hasFetchedPendingOrders
)

export const selectPendingOrdersAmount = createSelector(
    [selectOrderState],
    ordersState=>{
        const amountPending = ordersState.pendingOrders.reduce((pendingAmount,order)=>pendingAmount+=parseInt(order.pendingAmount),0)

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
export const selectNewOrdersCount = createSelector(
    [selectOrderState],
    ordersState => ordersState.newOrders.length
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

