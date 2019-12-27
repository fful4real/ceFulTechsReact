import OrderActionTypes from "./orders.types";


export const createNewOrder = order =>({
    type: OrderActionTypes.CREATE_ORDER,
    payload:order
});