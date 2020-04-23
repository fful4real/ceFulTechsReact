import {createSelector} from 'reselect'


const selectCitiesState = state => state.cities;

export const selectCities = createSelector(
    [selectCitiesState],
    cities => cities.cities
)

export const selectIsFetchingCities = createSelector(
    [selectCitiesState],
    cities => cities.isFetchingCities
)