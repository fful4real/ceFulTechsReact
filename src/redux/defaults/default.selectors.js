import {createSelector} from 'reselect'


const selectDefaultParamsState = state => state.defaultParams;

// Select Items Per Page
export const selectItemsPerPage = createSelector(
    [selectDefaultParamsState],
    defaultParamsState => defaultParamsState.itemsPerPage
)

// Select Items Per Page
export const selectActivePage = createSelector(
    [selectDefaultParamsState],
    defaultParamsState => defaultParamsState.activePage
)