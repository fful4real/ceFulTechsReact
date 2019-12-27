import AccountsData from "../../layout/content/accounts/accounts.data";

const INITIAL_STATE = {
    accounts:AccountsData
}

const accountsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'CREATE_NEW_ACCOUNT':
            return{
                ...state,
                accounts:action.payload
            }
    
        default:
            return state;
    }
}

export default accountsReducer;