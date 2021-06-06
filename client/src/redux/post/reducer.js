import {
    FETCH_POST_SUCCESS,
    FETCH_POST_ERROR,
    SAVE_POST_SUCCESS,
    SAVE_POST_ERROR,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    UPDATE_POST_SUCCESS,
    GET_UPDATE_INDEX_SUCCESS,
    GET_UPDATE_TABLE_SUCCESS
} from './types'

// const INITIAL_STATE = { all: [], successMessage: "Success Message", errorMessage: "Error Message" }

let INITIAL_STATE = {
    currentIndex: -1,
    postList: [],
    singlePost: {}
}

export default function (state = INITIAL_STATE, action) {
    var list = JSON.parse(localStorage.getItem('listData'))

    switch (action.type) {
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                postList: action.payload.data,
                successMessage: action.message
            }

        case FETCH_POST_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }

        case SAVE_POST_SUCCESS:
            return {
                postList: [...state.postList, action.payload],
                currentIndex: -1
            }

        case SAVE_POST_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }

        case DELETE_POST_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }


        case DELETE_POST_SUCCESS:
            return {
                ...state,
                postList: state.postList.filter(i => i._id !== action.payload)
            }

        case UPDATE_POST_SUCCESS:
            return {
                postList: [...state.postList, action.payload],
                currentIndex: -1
            }

        case GET_UPDATE_INDEX_SUCCESS:
            state.singlePost = state.postList[action.payload]
            return { ...state, singlePost: state.singlePost, currentIndex: action.payload }

        case GET_UPDATE_TABLE_SUCCESS:
            state.postList[state.currentIndex] = action.payload
            return { ...state, currentIndex: -1 }



        default:
            return state;
    }
}