import OrdersActionTypes from "./orders.types";


const INITIAL_STATE = {
    orders:[],
    isFetching:false,
    error:null
}

const ordersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case OrdersActionTypes.CREATE_ORDER:
            return{
                ...state,
                orders: [...state.orders,action.order]
            }
        case OrdersActionTypes.ORDERS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetching:false,
                orders: action.orders
            }
        
        case OrdersActionTypes.ORDERS_FETCHING_START:
            return{
                ...state,
                isFetching:true
            }

        case OrdersActionTypes.ORDERS_FETCHING_FAILURE:
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