import CustomersActionTypes from "./customers.types";
import { paginateResult, getPageCount } from "../../helpers/helper";


const INITIAL_STATE = {
    customers:[],
    isFetchingCustomers:false,
    isFetchingAllCustomers:false,
    isFetchingCustomersPage:false,
    error:null,
    currentPage:1,
    totalPages:null,
    customersPerPage:{},
    customerCountPerPage:10,
    allCustomers:[],
    totalCustomers:null,
    customerModal: '',
    showCustomerModal: false,
    currentCustomer: null,
    customerModalHeading:"Add Customer",
    isSentBy: false
}

let customers = [],
    totalCustomers = null,
    allCustomers =[],
    totalPages = null,
    customersPerPage ={}

const customersReducer = (state=INITIAL_STATE,action)=>{

    switch (action.type) {
        case CustomersActionTypes.CUSTOMERS_ADD_CUSTOMER_ORDER:
            return{
                ...state,
                customers: action.customers
            }
        case CustomersActionTypes.CUSTOMERS_ADD_CUSTOMER:
            return{
                ...state,
                customers: [...state.customers,action.customer]
            }
        case CustomersActionTypes.CUSTOMERS_FETCHING_SUCCESS:
            customers = action.customers['hydra:member']
            totalPages = getPageCount(customers.length)
            customersPerPage = paginateResult(customers)
            return{
                ...state,
                isFetchingCustomers:false,
                customers,
                totalCustomers: action.customers['hydra:totalItems'],
                totalPages,
                customersPerPage
            }
        case CustomersActionTypes.ALL_CUSTOMERS_FETCHING_START:
            return{
                ...state,
                isFetchingAllCustomers: true
            }
        case CustomersActionTypes.ALL_CUSTOMERS_FETCHING_SUCCESS:
            customers = action.customers
            totalCustomers = customers.length
            allCustomers = action.customers
            customersPerPage = paginateResult(customers)
            return{
                ...state,
                isFetchingAllCustomers: false,
                customers,
                allCustomers,
                totalCustomers,
                customersPerPage
            }

        case CustomersActionTypes.ALL_CUSTOMERS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingAllCustomers: false,
            }
        
        case CustomersActionTypes.CUSTOMERS_FETCHING_START:
            return{
                ...state,
                isFetchingCustomers:true
            }

        case CustomersActionTypes.CUSTOMERS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingCustomers:false,
                error: action.error
            }
        case CustomersActionTypes.SET_CUSTOMER_MODAL:
            return{
                ...state,
                customerModal: action.modal,
                showCustomerModal: true
            }
        case CustomersActionTypes.CLOSE_CUSTOMER_MODAL:
            return{
                ...state,
                showCustomerModal: false
            }
        
        case CustomersActionTypes.SET_CURRENT_CUSTOMER:
            return{
                ...state,
                currentCustomer:action.customerId
            }
        case CustomersActionTypes.SET_CUSTOMER_MODAL_HEADING:
            return{
                ...state,
                customerModalHeading:action.heading 
            }
        case CustomersActionTypes.UPDATE_CUSTOMER:
            customers = state.customers.map(customer=>customer.id===action.customer.id?action.customer:customer)
            return{
                ...state,
                customers
            }
        case CustomersActionTypes.DELETE_CUSTOMER:
            customers = state.customers.filter(customer=>customer.id!==action.customer.id)
            return{
                ...state,
                customers
            }
        case CustomersActionTypes.SET_IS_SENT_BY:
            
            return{
                ...state,
                isSentBy:action.sentBy
            }
    
        default:
            return state;
    }
}

export default customersReducer;