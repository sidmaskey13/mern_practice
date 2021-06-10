import { FETCH_POST_SUCCESS, FETCH_POST_ERROR, SAVE_POST_SUCCESS, SAVE_POST_ERROR, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS, GET_UPDATE_INDEX_SUCCESS, GET_UPDATE_TABLE_SUCCESS, DELETE_POST_ERROR, CLEAR_POST, FETCH_POST_ACTIVE_SUCCESS } from './types'

export const clearPostForm = () => {
    return {
        type: CLEAR_POST
    }
}

export const fetchPostSuccess = (response) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: response
    }
}

export const fetchActivePostSuccess = (response) => {
    return {
        type: FETCH_POST_ACTIVE_SUCCESS,
        payload: response
    }
}

export const fetchPostError = (error) => {
    return {
        type: FETCH_POST_ERROR,
        message: error
    }
}

export const savePostSuccess = (data) => {
    return {
        type: SAVE_POST_SUCCESS,
        payload: data
    }
}

export const savePostError = (error) => {
    return {
        type: SAVE_POST_ERROR,
        message: error
    }
}

export const deletePostSuccess = id => {
    return {
        type: DELETE_POST_SUCCESS,
        payload: id
    }
}

export const deletePostError = (error) => {
    return {
        type: DELETE_POST_ERROR,
        message: error
    }
}

export const updatePostSuccess = data => {
    return {
        type: UPDATE_POST_SUCCESS,
        payload: data
    }
}

export const getUpdateIndexSuccess = index => {
    return {
        type: GET_UPDATE_INDEX_SUCCESS,
        payload: index
    }
}

export const updateTableSuccess = data => {
    return {
        type: GET_UPDATE_TABLE_SUCCESS,
        payload: data
    }
}