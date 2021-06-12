import {
    FETCH_POST_SUCCESS,
    FETCH_POST_ERROR,
    SAVE_POST_SUCCESS,
    SAVE_POST_ERROR,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    UPDATE_POST_SUCCESS,
    GET_UPDATE_INDEX_SUCCESS,
    GET_UPDATE_TABLE_SUCCESS,
    CLEAR_POST,
    FETCH_POST_ACTIVE_SUCCESS
} from './types'

let INITIAL_STATE = {
    currentIndex: -1,
    postList: [],
    singlePost: {},
    totalData: 0,
    message: '',
}

export default function (state = INITIAL_STATE, action) {
    var list = JSON.parse(localStorage.getItem('listData'))

    switch (action.type) {
        case CLEAR_POST:
            return {
                ...state,
                currentIndex: -1, singlePost: INITIAL_STATE.singlePost
            }
        case FETCH_POST_ACTIVE_SUCCESS:
            return {
                ...state,
                postList: action.payload.data,
                totalData: action.payload.totalData,
            }

        case FETCH_POST_SUCCESS:
            return {
                ...state,
                postList: action.payload.data,
                totalData: action.payload.totalData,
            }

        case FETCH_POST_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }

        case SAVE_POST_SUCCESS:
            return {
                postList: [action.payload, ...state.postList],
                currentIndex: -1
            }

        case FETCH_POST_ERROR:
        case SAVE_POST_ERROR:
        case DELETE_POST_ERROR:
            return {
                ...state,
                message: action.message
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
            // state.postList.splice(state.currentIndex, 1)
            state.postList[state.currentIndex] = action.payload
            return { ...state, postList: state.postList, currentIndex: -1 }



        default:
            return state;
    }
}