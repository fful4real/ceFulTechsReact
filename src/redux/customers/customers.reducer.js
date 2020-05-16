import CustomersActionTypes from "./customers.types";


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
    showCustomerModal: false
}

let customers = [],
    totalCustomers = null

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
            return{
                ...state,
                isFetchingCustomers:false,
                customers: action.customers['hydra:member'],
                totalCustomers: action.customers['hydra:totalItems'],
            }
        case CustomersActionTypes.ALL_CUSTOMERS_FETCHING_START:
            return{
                ...state,
                isFetchingAllCustomers: true
            }
        case CustomersActionTypes.ALL_CUSTOMERS_FETCHING_SUCCESS:
            customers = action.customers
            totalCustomers = customers.length
            return{
                ...state,
                isFetchingAllCustomers: false,
                customers,
                allCustomers: action.customers,
                totalCustomers
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
    
        default:
            return state;
    }
}

export default customersReducer;