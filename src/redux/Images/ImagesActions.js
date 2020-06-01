import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import ImagesActionTypes from "./ImagesTypes";

// Fetch images 
export const fetchImagesStart = ()=>({
    type: ImagesActionTypes.IMAGES_FETCHING_START
})
export const fetchImagesSuccess = images =>({
    type: ImagesActionTypes.IMAGES_FETCHING_SUCCESS,
    images
})
export const fetchImagesFailure = error =>({
    type: ImagesActionTypes.IMAGES_FETCHING_FAILURE,
    error
})

export const fetchImagesAsync = ()=>{

    return dispatch =>{
        dispatch(fetchImagesStart());
        AxiosAgent.request('get',API_ROUTES.images(null), null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchImagesSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Update Account type

export const updateImages = images =>({
    type: ImagesActionTypes.UPDATE_IMAGES,
    images
})

export const updateImagesAsync = images =>{

    return dispatch =>{
        dispatch(updateImages(images));
    }
}
