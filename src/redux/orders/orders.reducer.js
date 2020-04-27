import OrdersActionTypes from "./orders.types";
import { capitalizeFirstLetter } from "../../helpers/helper";


const INITIAL_STATE = {
    orders:[],
    isFetching:false,
    error:null,
    isFechingOrderItemOrderEntries:false,
    isFechingOrderItemLatestOrderEntry:false
}

const ordersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case OrdersActionTypes.CREATE_ORDER:
            return{
                ...state,
                orders: [action.order,...state.orders]
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
        
        case OrdersActionTypes.ORDER_ITEM_ORDER_ENTRIES_FETCHING_START:
            return{
                ...state,
                isFechingOrderItemOrderEntries:true
            }
            
        case OrdersActionTypes.ORDER_ITEM_ORDER_ENTRIES_FETCHING_SUCCESS:
            return{
                ...state,
                orders:state.orders.map(
                    order=>order.id===action.order.id?
                        {...order,
                            orderEntries:action.order.orderEntries.map(orderEntry=>(
                                {...orderEntry,
                                    createdBy:{...orderEntry.createdBy, firstName:capitalizeFirstLetter(orderEntry.createdBy.firstName), lastName:orderEntry.createdBy.lastName.toUpperCase()}})), 
                                    hasFetchedOrderEntries:true,
                                }
                        :
                        order
                    ),
                isFechingOrderItemOrderEntries:false
            }
        
        case OrdersActionTypes.ORDER_ITEM_ORDER_ENTRIES_FETCHING_FAILURE:
            return{
                ...state,
                isFechingOrderItemOrderEntries:false
            }
        
        case OrdersActionTypes.ORDER_ITEM_LATEST_ORDER_ENTRY_FETCHING_START:
            return{
                ...state,
                isFechingOrderItemLatestOrderEntry:true
            }
        case OrdersActionTypes.ORDER_ITEM_LATEST_ORDER_ENTRY_FETCHING_SUCCESS:
            return{
                ...state,
                orders:state.orders.map(
                    mapOrder=>mapOrder.id===action.order.id?
                        action.order
                        :
                        mapOrder
                    ),
                isFechingOrderItemOrderEntries:false
            }
        
        case OrdersActionTypes.ORDER_ITEM_LATEST_ORDER_ENTRY_FETCHING_FAILURE:
            return{
                ...state,
                isFechingOrderItemOrderEntries:false
            }
    
        default:
            return state;
    }
}

export default ordersReducer;