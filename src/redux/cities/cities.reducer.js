import CitiesActionTypes from "./cities.types";


const INITIAL_STATE = {
    cities:[],
    isFetchingCities:false,
    error:null
}
const CitiesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case CitiesActionTypes.CITIES_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingCities:false,
                cities: action.cities
            }
        
        case CitiesActionTypes.CITIES_FETCHING_START:
            return{
                ...state,
                isFetchingCities:true
            }

        case CitiesActionTypes.CITIES_FETCHING_FAILURE:
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