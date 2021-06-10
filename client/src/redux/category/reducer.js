import { FETCH_CATEGORY_SUCCESS } from "./types"
let INITIAL_STATE = {
    categoryList: [],
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryList: action.payload.data,
                successMessage: action.message
            }
        default:
            return state;
    }
}