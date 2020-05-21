import BanksActionTypes from "./BanksTypes";


const INITIAL_STATE = {
    banks:[],
    isFetchingBanks:false,
    error:null,
}

// let banks = []

const BanksReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case BanksActionTypes.BANKS_FETCHING_START:
            return{
                ...state,
                isFetchingBanks:true,
            }
        
        case BanksActionTypes.BANKS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingBanks:false,
                banks: action.banks['hydra:member']
            }

        case BanksActionTypes.BANKS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingBanks:false,
                error: action.error
            }
        case BanksActionTypes.UPDATE_BANKS:
            return{
                ...state,
                banks:action.banks
            }
    
        default:
            return state;
    }
}

export default BanksReducer;