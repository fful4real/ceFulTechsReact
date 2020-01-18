import {createSelector} from 'reselect'
import { numberWithCommas } from '../../helpers/helper';


const selectOrderState = state => state.orders;
const selectOrders = createSelector(
    [selectOrderState],
    orders => orders.orders
)

export const selectIsFetching = createSelector(
    [selectOrderState],
    orders => orders.isFetching
)

// Total Orders Selectors
export const selectOrderCount = createSelector(
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

// Selectr for processed orders
export const selectProcessedOrdersCount = createSelector(
    [selectOrders],
    orders=>orders.reduce((precessedCount,order)=>parseInt(order.processedAmount)>0 ?precessedCount+1:precessedCount,0)
);

export const selectProcessedOrdersAmount = createSelector(
    [selectOrders],
    orders=>{
        const amountProcessed = orders.reduce((processedAmount,order)=>processedAmount+=parseInt(order.processedAmount),0)

        return numberWithCommas(amountProcessed)
    }
);

// Selectors for Pending orders

export const selectPendingOrdersCount = createSelector(
    [selectOrders],
    orders=>orders.reduce((pendingCount,order)=>parseInt(order.pendingAmount)>0 ?pendingCount+1:pendingCount,0)
);

export const selectPendingOrdersAmount = createSelector(
    [selectOrders],
    orders=>{
        const amountPending = orders.reduce((pendingAmount,order)=>pendingAmount+=parseInt(order.pendingAmount),0)

        return numberWithCommas(amountPending)
    }
);

