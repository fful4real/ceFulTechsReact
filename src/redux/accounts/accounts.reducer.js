import AccountsActionTypes from "./accounts.types";


const INITIAL_STATE = {
    accounts:[],
    isFetchingAccounts:false,
    error:null
}

const AccountsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case AccountsActionTypes.ACCOUNTS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingAccounts:false,
                accounts: action.accounts
            }
        
        case AccountsActionTypes.ACCOUNTS_FETCHING_START:
            return{
                ...state,
                isFetchingAccounts:true
            }

        case AccountsActionTypes.ACCOUNTS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingAccounts:false,
                error: action.error
            }
    
        default:
            return state;
    }
}

export default AccountsReducer;