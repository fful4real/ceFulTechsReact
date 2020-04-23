import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import StatusesActionTypes from "./statuses.types";


export const fetchStatusesStart = ()=>({
    type: StatusesActionTypes.STATUSES_FETCHING_START
})
export const fetchStatusesSuccess = statuses =>({
    type: StatusesActionTypes.STATUSES_FETCHING_SUCCESS,
    statuses
})
export const fetchStatusesFailure = error =>({
    type: StatusesActionTypes.STATUSES_FETCHING_FAILURE,
    error
})

export const fetchStatusesAsync = ()=>{

    return dispatch =>{
        dispatch(fetchStatusesStart());
        AxiosAgent.request('get',API_ROUTES.statuses(null), null, null)
        .then(resp => {
            // console.log(resp.data['hydra:member'])
            dispatch(fetchStatusesSuccess(resp.data['hydra:member']))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}