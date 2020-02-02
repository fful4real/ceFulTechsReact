import Cities from "./cities.types";


const INITIAL_STATE = {
    cities:[],
    isFetchingCities:false,
    error:null
}

const CitiesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case Cities.CURRENCIES_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingCities:false,
                cities: action.cities
            }
        
        case Cities.CURRENCIES_FETCHING_START:
            return{
                ...state,
                isFetchingCities:true
            }

        case Cities.CURRENCIES_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingCities:false,
                error: action.error
            }
    
        default:
            return state;
    }
}

export default CitiesReducer;