const INITIAL_STATE = {
    customers:null
}

const customersReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case 'CREATE_CUSTOMER':
            return{
                ...state,
                customers:action.payload
            }
    
        default:
            return state;
    }
}

export default customersReducer;