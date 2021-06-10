import { fetchCategorySuccess } from './action'

import axios from 'axios';
import { tokenConfig } from "../auth/api";
import { notificationError, notificationSuccess } from "../notification/action";

import { SERVER_URL } from "../../App";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const fetchCategory = () => (dispatch, getState) => {
    axios.get(SERVER_URL + "/category/active", config)
        .then(res => {
            dispatch(fetchCategorySuccess(res))
        }
        ).catch(err => {
            console.log(err)
            dispatch(notificationError(err.toString()))
        })
}
