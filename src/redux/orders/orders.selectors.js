import {createSelector} from 'reselect'


const selectOrder = state => state.orders;

export const selectOrderCount = createSelector(
    [selectOrder],
    orders =>  orders.orders.length
);

export const selectOrdersTotalAmount = createSelector(
    [selectOrder],
    orders => orders.orders.reduce((totalAmount,order)=>totalAmount+=parseInt(order.createdDate),0)
)

export const selectIsFetching = createSelector(
    [selectOrder],
    orders => orders.isFetching
)