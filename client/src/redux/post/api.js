import { fetchPostSuccess, fetchPostError, savePostSuccess, savePostError, deletePostSuccess, deletePostError, updateTableSuccess } from './action'

import axios from 'axios';
import { notificationError, notificationSuccess } from "../notification/action";
import { mainUrl } from "../../App";

const ROOT_URL = "http://localhost:4000/api/post";
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const fetchPosts = () => dispatch => {
    axios.get(ROOT_URL)
        .then(res => {
            dispatch(fetchPostSuccess(res))
            dispatch(notificationSuccess('Posts Successfully Retrieved'))
        }
        ).catch(err => {
            console.log(err)
            dispatch(fetchPostError(err.toString()))
            dispatch(notificationError(err.toString()))

        })
}

export const addPost = (data) => (dispatch, getState) => {
    axios.post(ROOT_URL, data, config)
        .then(res => {
            dispatch(savePostSuccess(res.data))
            dispatch(notificationSuccess('Post Successfully Added'))
        }
        ).catch(err => {
            dispatch(savePostError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};

export const editPost = (data) => (dispatch, getState) => {
    axios.post(ROOT_URL, data, config)
        .then(res => {
            dispatch(updateTableSuccess(res.data))
            dispatch(notificationSuccess('Post Successfully Updated!!!!!!'))
        }
        ).catch(err => {
            dispatch(savePostError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};

export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(ROOT_URL + '/' + id)
        .then(res => {
            dispatch(deletePostSuccess(id))
            dispatch(notificationSuccess('Post Successfully Deleted'))
        }
        ).catch(err => {
            dispatch(deletePostError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};

