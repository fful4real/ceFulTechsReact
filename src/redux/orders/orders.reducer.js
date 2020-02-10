import OrderActionTypes from "./orders.types";
import OrdersActionTypes from "../../layout/content/orders/orders.types";


const INITIAL_STATE = {
    orders:[],
    isFetching:false,
    error:null
}

const ordersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case OrderActionTypes.CREATE_ORDER:
            return{
                ...state,
                orders: [...state.orders,action.order]
            }
        case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                isFetching:false,
                orders: action.orders
            }
        
        case OrdersActionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                isFetching:true
            }

        case OrdersActionTypes.FETCH_ORDERS_FAILURE:
            return{
                ...state,
                isFetching:false,
                error: action.payload
            }
            
        case OrdersActionTypes.UPDATE_ORDERS:
            return{
                ...state,
                orders:action.orders
            }
    
        default:
            return state;
    }
}

export default ordersReducer;