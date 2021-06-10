import { FETCH_CATEGORY_SUCCESS } from './types'

export const fetchCategorySuccess = (response) => {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        payload: response
    }
}
