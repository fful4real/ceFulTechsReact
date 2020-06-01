import {createSelector} from 'reselect'


const selectImagesState = state => state.images;

// Select account types
export const selectImages = createSelector(
    [selectImagesState],
    imagesState => imagesState.images
)

// Select is fetching account types
export const selectIsFetchingImages = createSelector(
    [selectImagesState],
    imagesState=>imagesState.isFetchingImages
)