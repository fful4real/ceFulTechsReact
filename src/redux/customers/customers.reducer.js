import CustomersActionTypes from "./customers.types";


const INITIAL_STATE = {
    customers:[],
    isFetchingCustomers:false,
    error:null
}

const customersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case CustomersActionTypes.CUSTOMERS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingCustomers:false,
                customers: action.customers
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
    
        default:
            return state;
    }
}

export default customersReducer;