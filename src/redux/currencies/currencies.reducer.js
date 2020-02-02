import Currencies from "./currencies.types";


const INITIAL_STATE = {
    currencies:[],
    isFetchingCurrencies:false,
    error:null
}

const CurrenciesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case Currencies.CURRENCIES_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingCurrencies:false,
                currencies: action.currencies
            }
        
        case Currencies.CURRENCIES_FETCHING_START:
            return{
                ...state,
                isFetchingCurrencies:true
            }

        case Currencies.CURRENCIES_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingCurrencies:false,
                error: action.error
            }
    
        default:
            return state;
    }
}

export default CurrenciesReducer;