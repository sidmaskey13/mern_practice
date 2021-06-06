import { SUCCESS_NOTIFY, ERROR_NOTIFY } from "./types"

const INITIAL_STATE = { message: '', type: '' }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SUCCESS_NOTIFY:
            return {
                ...state,
                type: 'success',
                message: action.message
            }

        case ERROR_NOTIFY:
            return {
                ...state,
                type: 'error',
                message: action.payload
            }

        default:
            return state;
    }
}