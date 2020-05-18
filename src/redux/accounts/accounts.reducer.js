import AccountsActionTypes from "./accounts.types";
import { paginateResult, getPageCount } from "../../helpers/helper";


const INITIAL_STATE = {
    accounts:[],
    isFetchingAccounts:false,
    totalPages:null,
    accountsPerPage:[],
    allAccounts: [],
    totalAccounts:null,
    error:null,
    accountsModal:{
        show: false,
        body:'',
        heading:'Add Account'
    }
}

let accounts = [],
    totalAccounts = null,
    allAccounts =[],
    totalPages = null,
    accountsPerPage ={}

const AccountsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case AccountsActionTypes.ACCOUNTS_FETCHING_SUCCESS:
            accounts = action.accounts['hydra:member']
            totalPages = getPageCount(accounts)
            accountsPerPage = paginateResult(accounts)
            allAccounts = accounts
            totalAccounts = accounts.length
            return{
                ...state,
                isFetchingAccounts:false,
                accounts,
                totalPages,
                accountsPerPage,
                allAccounts,
                totalAccounts
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
        case AccountsActionTypes.UPDATE_ACCOUNTS:
            return{
                ...state,
                accounts:action.accounts
            }
        case AccountsActionTypes.SET_SHOW_ACCOUNTS_MODAL:
            return{
                ...state,
                accountsModal:{...state.accountsModal, show:action.show}
            }
        case AccountsActionTypes.SET_ACCOUNTS_MODAL_HEADING:
            return{
                ...state,
                accountsModal:{...state.accountsModal, heading:action.heading}
            }
        case AccountsActionTypes.SET_ACCOUNTS_MODAL_BODY:
            return{
                ...state,
                accountsModal:{...state.accountsModal, body:action.body}
            }
        case AccountsActionTypes.SET_CLOSE_ACCOUNTS_MODAL:
            return{
                ...state,
                accountsModal:{...state.accountsModal, show:false}
            }
    
        default:
            return state;
    }
}

export default AccountsReducer;