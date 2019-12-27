import {createSelector} from 'reselect'


const selectOrder = state => state.orders.orders;

export const selectOrderCount = createSelector(
    [selectOrder],
    orders =>  orders.length
);

export const selectOrdersTotalAmount = createSelector(
    [selectOrder],
    orders => orders.reduce((totalAmount,order)=>totalAmount+=parseInt(order.createdDate),0)
)