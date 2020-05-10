import OrdersActionTypes from "./orders.types";
import { capitalizeFirstLetter, formatDate, addAttribute } from "../../helpers/helper";


const INITIAL_STATE = {
    orders:[],
    isFetching:false,
    isFetchingAllOrders:false,
    isFetchingOrdersPage:false,
    isFetchingPendingOrders:false,
    isFetchingProcessedOrders:false,
    isFetchingNewOrders:false,
    isFechingOrderItemOrderEntries:false,
    isFechingOrderItemLatestOrderEntry:false,
    hasFetchedPendingOrders:false,
    hasFetchedProcessedOrders:false,
    hasFetchedNewOrders:false,
    shouldFetchPage:false,
    error:null,
    currentPage:1,
    totalPages:null,
    totalOrders:null,
    pendingOrders: [],
    processedOrders: [],
    newOrders: [],
    ordersPerPage:{},
    allOrders:[]
}

const fixOrdersCustomerNames = orders => orders.map(order=>({
    ...order,
    customer:{
        ...order.customer,
        firstName: capitalizeFirstLetter(order.customer.firstName),
        lastName: order.customer.lastName.toUpperCase()
    }
}))

const fixOrderCustomerNames = order =>({
    ...order,
    customer: {
        ...order.customer,
        firstName: capitalizeFirstLetter(order.customer.firstName),
        lastName: order.customer.lastName.toUpperCase()
    }
})

let orders =[], allOrders =[]

const ordersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case OrdersActionTypes.CREATE_ORDER:
            const actionOrder = fixOrderCustomerNames(action.order)
            const myFirstPage = [actionOrder, ...state.orders.slice(0,9)]
            
            return{
                ...state,
                orders: [actionOrder,...state.orders],
                ordersPerPage:{'page_1':formatDate(myFirstPage, 'datec')},
                currentPage:1
            }
        case OrdersActionTypes.SET_ORDERS_PAGE:
            return{
                ...state,
                currentPage:action.page
            }
        case OrdersActionTypes.SET_SHOULD_FETCH_PAGE:
            return{
                ...state,
                shouldFetchPage:action.fetchPage
            }
        case OrdersActionTypes.ORDERS_FETCHING_SUCCESS:

            const total_Pages = action.orders['hydra:view']['hydra:last']
            const totalPageStringLenth = total_Pages.length
            const indexOfValue = total_Pages.indexOf('=')+1
            const totalOrderPages = total_Pages.substr(indexOfValue,totalPageStringLenth-indexOfValue)
            const page_1_orders= fixOrdersCustomerNames(action.orders['hydra:member'])
            // console.log(totalOrderPages)
            return{
                ...state,
                isFetching:false,
                orders: action.orders['hydra:member'],
                totalOrders:action.orders['hydra:totalItems'],
                totalPages: parseInt(totalOrderPages),
                ordersPerPage:{page_1: formatDate(page_1_orders, 'datec')}
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

            
    case OrdersActionTypes.ALL_ORDERS_FETCHING_START:
        return{
            ...state,
            isFetchingAllOrders:true
        }
    
    case OrdersActionTypes.ALL_ORDERS_FETCHING_SUCCESS:
        allOrders = addAttribute(action.orders,'hasFetchedOrderEntries',false)
        allOrders = fixOrdersCustomerNames(allOrders)
    return{
        ...state,
        isFetchingAllOrders:false,
        allOrders,
        orders:action.orders
    }

    case OrdersActionTypes.ALL_ORDERS_FETCHING_FAILURE:
        return{
            ...state,
            isFetchingAllOrders:false,
            error: action.err
        }

        case OrdersActionTypes.PENDING_ORDERS_FETCHING_START:
            return{
                ...state,
                isFetchingPendingOrders:true
            }
            

        case OrdersActionTypes.PENDING_ORDERS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingPendingOrders:false,
                pendingOrders: action.orders['hydra:member'],
                hasFetchedPendingOrders:true
            }

        case OrdersActionTypes.PENDING_ORDERS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingPendingOrders:false,
                hasFetchedPendingOrders:true
            }

        case OrdersActionTypes.PROCESSED_ORDERS_FETCHING_START:
            return{
                ...state,
                isFetchingProcessedOrders:true
            }

        case OrdersActionTypes.PROCESSED_ORDERS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingProcessedOrders:false,
                processedOrders: action.orders['hydra:member'],
                hasFetchedProcessedOrders:true
            }

        case OrdersActionTypes.PROCESSED_ORDERS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingProcessedOrders:false,
                hasFetchedProcessedOrders:true
            }

        case OrdersActionTypes.NEW_ORDERS_FETCHING_START:
            return{
                ...state,
                isFetchingNewOrders:true,
                shouldFetchPage:false
            }

        case OrdersActionTypes.NEW_ORDERS_FETCHING_SUCCESS:
            
            return{
                ...state,
                isFetchingNewOrders:false,
                newOrders: fixOrdersCustomerNames(action.orders['hydra:member']),
                hasFetchedNewOrders:true,
            }

        case OrdersActionTypes.NEW_ORDERS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingNewOrders:false,
                hasFetchedNewOrders:true
            }


        case OrdersActionTypes.ORDERS_PAGE_FETCHING_START:
            return{
                ...state,
                isFetchingOrdersPage:true,
                shouldFetchPage:true
            }

        case OrdersActionTypes.ORDERS_PAGE_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingOrdersPage:false,
                orders: [...state.orders, ...action.orders],
                shouldFetchPage:false,
                ordersPerPage: {...state.ordersPerPage, [`page_${state.currentPage}`]: formatDate(action.orders, 'datec')}
            }

        case OrdersActionTypes.ORDERS_PAGE_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingOrdersPage:false,
                shouldFetchPage:false
            }
            
        case OrdersActionTypes.UPDATE_ORDERS:
            orders = state.orders.map(order=>order.id===action.order.id?action.order:order)
            allOrders = state.allOrders.map(order=>order.id===action.order.id?action.order:order)
            return{
                ...state,
                orders,
                ordersPerPage: { 'page_1': formatDate(orders.slice(0,10), 'datec')},
                currentPage: 1,
                allOrders
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