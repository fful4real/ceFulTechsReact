import ImagesActionTypes from "./ImagesTypes";


const INITIAL_STATE = {
    images:[],
    isFetchingImages:false,
    error:null,
}

// let images = []

const ImagesReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ImagesActionTypes.IMAGES_FETCHING_START:
            return{
                ...state,
                isFetchingImages:true,
            }
        
        case ImagesActionTypes.IMAGES_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingImages:false,
                images: action.images['hydra:member']
            }

        case ImagesActionTypes.IMAGES_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingImages:false,
                error: action.error
            }
        case ImagesActionTypes.UPDATE_IMAGES:
            return{
                ...state,
                images:action.images
            }
    
        default:
            return state;
    }
}

export default ImagesReducer;