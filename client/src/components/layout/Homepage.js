import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePosts } from '../../redux/post/api';


function Dashboard() {
    const posts = useSelector(state => state.posts.postList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchActivePosts());
    }, [])
    return (
        <div>
            <h1>Welcome to Homepage</h1>
            <ul>{posts ? posts.map((post, index) => (
                <li>{post.title}</li>
            )) : "No data"}</ul>
        </div>
    )
}
export default Dashboard;