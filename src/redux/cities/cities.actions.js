import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import CitiesActionTypes from "./cities.types";


export const fetchCitiesStart = ()=>({
    type: CitiesActionTypes.CITIES_FETCHING_START
})
export const fetchCitiesSuccess = cities =>({
    type: CitiesActionTypes.CITIES_FETCHING_SUCCESS,
    cities
})
export const fetchCitiesFailure = error =>({
    type: CitiesActionTypes.CITIES_FETCHING_FAILURE,
    error
})

export const fetchCitiesAsync = ()=>{

    return dispatch =>{
        dispatch(fetchCitiesStart());
        AxiosAgent.request('get',API_ROUTES.cities(null), null, null)
        .then(resp => {
            dispatch(fetchCitiesSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}