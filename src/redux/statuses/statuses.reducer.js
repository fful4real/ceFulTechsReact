import StatusesActionTypes from "./statuses.types";


const INITIAL_STATE = {
    statuses:[],
    isFetchingStatuses:false,
    error:null
}

const StatusesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case StatusesActionTypes.STATUSES_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingStatuses:false,
                statuses: action.statuses
            }
        
        case StatusesActionTypes.STATUSES_FETCHING_START:
            return{
                ...state,
                isFetchingStatuses:true
            }

        case StatusesActionTypes.STATUSES_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingStatuses:false,
                error: action.error
            }
    
        default:
            return state;
    }
}

export default StatusesReducer;