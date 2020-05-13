import {createSelector} from 'reselect'
import { numberWithCommas, capitalizeFirstLetter } from '../../helpers/helper';
import { selectMonthsOrders, selectNotCompletedOrders } from '../orders/orders.selectors';

export const selectCustomersState = state => state.customers;
export const selectCustomers = createSelector(
    [selectCustomersState],
    customers => customers.customers.map(customer=>({...customer,
        firstName:capitalizeFirstLetter(customer.firstName),
        lastName:customer.lastName.toUpperCase()
    }))
)

export const selectIsFetchingCustomers = createSelector(
    [selectCustomersState],
    customers => customers.isFetchingCustomers
)

// Total Customers Selectors
export const selectTotalCustomers = createSelector(
    [selectCustomersState],
    customers =>  customers.totalCustomers
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



// Customers of the month
export const selectCustomersOfTheMonth = createSelector(
    [selectCustomers],
    customers => customers.filter(customer=>{
        const customerDate = new Date(customer.datec);
        const currentDate = new Date();
        if((customerDate.getMonth()===currentDate.getMonth())
            && (customerDate.getYear()===currentDate.getYear())
            ){
            return true;
        }
        return false
    })
)

// Customers of the month count
export const selectCustomersOfTheMonthCount = createSelector(
    [selectCustomersOfTheMonth],
    customers => customers.length
)

// Amount sent by customers of the month
export const selectAmountForMonthsCustomers = createSelector(
    [selectCustomersOfTheMonth,selectMonthsOrders],
    (customers, orders)=>customers.reduce((totalAmount, customer)=>{
        const amountForCustomer = orders.reduce((orderAmount, order)=>
            order.customer.id === customer.id?order.amountOut+orderAmount:orderAmount
        ,0)

        return amountForCustomer+totalAmount
    },0)
)

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

// Selectors for Customers Pending Orders

export const selectCustomersPendingOrders = createSelector(
    [selectNotCompletedOrders],
    (pendingOrders) => {
        let theCustomersIds = [], theCustomers =[]
        pendingOrders.map(order=>{
            if (!theCustomersIds.includes(order.customer.id)) {
              theCustomersIds.push(order.customer.id)
              theCustomers.push(order.customer)
            }
            return true
        })
        // console.log(theCustomers)
        return theCustomers
    }
);

// Select Customers Pending Orders Count
export const selectCustomersPendingOrdersCount = createSelector(
    [selectCustomersPendingOrders],
    customers => customers.length
)

export const selectPendingCustomersAmount = createSelector(
    [selectCustomers],
    customers=>{
        const amountPending = customers.reduce((pendingAmount,order)=>pendingAmount+=parseInt(order.pendingAmount),0)

        return numberWithCommas(amountPending)
    }
);

// Select is fetching all customers
export const selectIsFetchingAllCustomers = createSelector(
    [selectCustomersState],
    customersState => customersState.isFetchingAllCustomers
)

// Select the modal to show
export const selectCustomerModal = createSelector(
    [selectCustomersState],
    customersState => customersState.customerModal
)

// Select Show customer modal bolean
export const selectShowCustomerModal = createSelector(
    [selectCustomersState],
    customersState => customersState.showCustomerModal
)



