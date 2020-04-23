import {createSelector} from 'reselect'
import { numberWithCommas } from '../../helpers/helper';


const selectCustomersState = state => state.customers;
const selectCustomers = createSelector(
    [selectCustomersState],
    customers => customers.customers
)

export const selectIsFetchingCustomers = createSelector(
    [selectCustomersState],
    customers => customers.isFetchingCustomers
)

// Total Customers Selectors
export const selectOrderCount = createSelector(
    [selectCustomers],
    customers =>  customers.length
);

export const selectCustomersTotalAmount = createSelector(
    [selectCustomers],
    customers => {
       const amount = customers.reduce((totalAmount,order)=>totalAmount+=parseInt(order.amountOut),0);

       return numberWithCommas(amount)
    }
)


// Count Customers Of The Month Selectors
export const selectOrderCountOfMonth = createSelector(
    [selectCustomers],
    customers => {
        const numberOfCustomersForMonth = customers.reduce(
            (totalCustomers,order)=>{
                const orderDate = new Date(order.datec);
                const currentDate = new Date();

                if((orderDate.getMonth()===currentDate.getMonth())
                    && (orderDate.getYear()===currentDate.getYear())
                    ){
                    // console.log("Order ID: ",order.id)
                    return totalCustomers+1;
                }

                return totalCustomers;
            }
            
            ,0);
 
        return numberOfCustomersForMonth
     }
);

// Ampunt for Customers Of The Month Selectors
export const selectAmountForMonthCustomers = createSelector(
    [selectCustomers],
    customers => {
        const amountOfCustomersForMonth = customers.reduce(
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
 
        return numberWithCommas(amountOfCustomersForMonth)
     }
);

// Selectr for processed customers
export const selectProcessedCustomersCount = createSelector(
    [selectCustomers],
    customers=>customers.reduce((precessedCount,order)=>parseInt(order.processedAmount)>0 ?precessedCount+1:precessedCount,0)
);

export const selectProcessedCustomersAmount = createSelector(
    [selectCustomers],
    customers=>{
        const amountProcessed = customers.reduce((processedAmount,order)=>processedAmount+=parseInt(order.processedAmount),0)

        return numberWithCommas(amountProcessed)
    }
);

// Selectors for Pending customers

export const selectPendingCustomersCount = createSelector(
    [selectCustomers],
    customers=>customers.reduce((pendingCount,order)=>parseInt(order.pendingAmount)>0 ?pendingCount+1:pendingCount,0)
);

export const selectPendingCustomersAmount = createSelector(
    [selectCustomers],
    customers=>{
        const amountPending = customers.reduce((pendingAmount,order)=>pendingAmount+=parseInt(order.pendingAmount),0)

        return numberWithCommas(amountPending)
    }
);

