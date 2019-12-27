import OrdersData from "../../layout/content/orders/last-ten-orders/data";
import OrderActionTypes from "./orders.types";


const INITIAL_STATE = {
    orders:OrdersData
}

const ordersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case OrderActionTypes.CREATE_ORDER:
            return{
                ...state,
                orders: [...state.orders,action.payload]
            }
    
        default:
            return state;
    }
}

export default ordersReducer;