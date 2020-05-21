import AccountTypesActionTypes from "./AccountTypesTypes";


const INITIAL_STATE = {
    accountTypes:[],
    isFetchingAccountTypes:false,
    error:null,
}

// let accountTypes = []

const AccountTypesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case AccountTypesActionTypes.ACCOUNT_TYPES_FETCHING_START:
            return{
                ...state,
                isFetchingAccountTypes:true,
            }
        
        case AccountTypesActionTypes.ACCOUNT_TYPES_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingAccountTypes:false,
                accountTypes: action.accountTypes['hydra:member']
            }

        case AccountTypesActionTypes.ACCOUNT_TYPES_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingAccountTypes:false,
                error: action.error
            }
        case AccountTypesActionTypes.UPDATE_ACCOUNT_TYPES:
            return{
                ...state,
                accountTypes:action.accountTypes
            }
    
        default:
            return state;
    }
}

export default AccountTypesReducer;