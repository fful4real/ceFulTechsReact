import {createSelector} from 'reselect'
import { numberWithCommas, capitalizeFirstLetter } from '../../helpers/helper';
import moment from 'moment';


const selectOrderState = state => state.orders;
const selectCurrencyState = state => state.currencies;
const selectCitiesState = state => state.cities;
const selectCurrencies = createSelector(
    [selectCurrencyState],
    currencies => currencies.currencies
)
const selectCities = createSelector(
    [selectCitiesState],
    cities => cities.cities
)

export const selectOrders = createSelector(
    [selectOrderState, selectCurrencies, selectCities],
    (orders, currencies, cities) => orders.orders.map(order=>(
        {...order,
            currencyIn:typeof(order.currencyIn) !== 'object'? currencies.filter(currency=>parseInt(currency.id)===parseInt(order.currencyIn.split("/")[3]))[0]:order.currencyIn,
            currencyOut:typeof(order.currencyOut) !== 'object'? currencies.filter(currency=>parseInt(currency.id)===parseInt(order.currencyOut.split("/")[3]))[0]:order.currencyOut,
            customer: {...order.customer,
                 fkCity:typeof(order.customer.fkCity) !== 'object'? cities.filter(city=>parseInt(city.id)===parseInt(order.customer.fkCity.split("/")[3]))[0]:order.customer.fkCity,
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

export const selectLastTenOrders = createSelector(
    [selectOrders],
    orders => orders.slice(0,10)
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

// Selectr for processed orders
export const selectProcessedOrdersCount = createSelector(
    [selectOrders],
    orders=>orders.reduce((precessedCount,order)=>order.status.statusCode==="OK" ?precessedCount+1:precessedCount,0)
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
    orders=>orders.reduce((pendingCount,order)=>order.status.statusCode==="PDN" ?pendingCount+1:pendingCount,0)
);

export const selectPendingOrdersAmount = createSelector(
    [selectOrders],
    orders=>{
        const amountPending = orders.reduce((pendingAmount,order)=>pendingAmount+=parseInt(order.pendingAmount),0)

        return numberWithCommas(amountPending)
    }
);

export const selectOrdersTableData = createSelector(
    [selectOrders,selectCurrencies],
    (orders,currencies)=>orders.map(order=>({...order,
        datec:moment(order.datec).format("DD - MMM - YYYY"),
        amountIn:numberWithCommas(order.amountIn),
        amountOut:numberWithCommas(order.amountOut)
    }))
)

