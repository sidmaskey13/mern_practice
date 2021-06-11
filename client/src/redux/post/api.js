import { fetchPostSuccess, fetchPostError, savePostSuccess, savePostError, deletePostSuccess, deletePostError, updateTableSuccess, fetchActivePostSuccess } from './action'

import axios from 'axios';
import { tokenConfig } from "../auth/api";

import { notificationError, notificationSuccess } from "../notification/action";
import { SERVER_URL } from "../../App";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const fetchPostsOwn = (page) => (dispatch, getState) => {
    axios.get(SERVER_URL + "/post/own/all?page=" + page, tokenConfig(getState))
        .then(res => {
            dispatch(fetchPostSuccess(res.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            console.log(err)
            dispatch(fetchPostError(err.toString()))
            dispatch(notificationError(err.toString()))

        })
}

export const fetchPostsAll = (page) => (dispatch, getState) => {
    axios.get(SERVER_URL + "/post/all?page=" + page, tokenConfig(getState))
        .then(res => {
            dispatch(fetchPostSuccess(res.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            console.log(err)
            dispatch(fetchPostError(err.toString()))
            dispatch(notificationError(err.toString()))

        })
}

export const fetchActivePosts = (page) => (dispatch, getState) => {
    axios.get(SERVER_URL + "/post/homepage/active?page=" + page)
        .then(res => {
            dispatch(fetchActivePostSuccess(res.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            console.log(err)
            dispatch(notificationError(err.toString()))
        })
}

export const addPost = (data) => (dispatch, getState) => {
    axios.post(SERVER_URL + "/post", data, tokenConfig(getState))
        .then(res => {
            console.log(res.data.data)
            dispatch(savePostSuccess(res.data.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            dispatch(savePostError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};

export const editPost = (data) => (dispatch, getState) => {
    axios.post(SERVER_URL + "/post", data, tokenConfig(getState))
        .then(res => {
            dispatch(updateTableSuccess(res.data.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            dispatch(savePostError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};

export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(SERVER_URL + "/post" + '/' + id, tokenConfig(getState))
        .then(res => {
            dispatch(deletePostSuccess(id))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            dispatch(deletePostError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};

