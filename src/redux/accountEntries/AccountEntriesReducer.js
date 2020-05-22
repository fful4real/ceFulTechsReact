import AccountEntriesActionTypes from "./AccountEntriesTypes";
import { paginateResult } from "../../helpers/helper";


const INITIAL_STATE = {
    accountEntries:[],
    isFetchingAccountEntries:false,
    isFetchingAllAccountEntries:false,
    accountEntriesPerPage:[],
    allAccountEntries: [],
    totalAccountEntries:null,
    error:null,
}
let accountEntries=[],
    accountEntriesPerPage = [],
    allAccountEntries = [],
    totalAccountEntries = null

const AccountEntriesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case AccountEntriesActionTypes.ALL_ACCOUNT_ENTRIES_FETCHING_SUCCESS:
            accountEntries = action.accountEntries
            totalAccountEntries = accountEntries.length
            allAccountEntries = accountEntries
            accountEntriesPerPage = paginateResult(accountEntries)
            
            return{
                ...state,
                isFetchingAllAccountEntries:false,
                accountEntries,
                accountEntriesPerPage,
                allAccountEntries,
                totalAccountEntries
            }
        case AccountEntriesActionTypes.ALL_ACCOUNT_ENTRIES_FETCHING_START:
            return{
                ...state,
                isFetchingAllAccountEntries:true
            }

        case AccountEntriesActionTypes.ALL_ACCOUNT_ENTRIES_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingAllAccountEntries:false,
                error: action.error
            }
        default:
            return state;
    }
}

export default AccountEntriesReducer;