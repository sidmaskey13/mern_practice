import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePosts } from '../../redux/post/api';
import { Card, Icon, Pagination } from 'semantic-ui-react'


function Dashboard() {
    const posts = useSelector(state => state.posts.postList)
    const totalData = useSelector(state => state.posts.totalData)

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [showPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchActivePosts(currentPage));
    }, [])

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage)
        dispatch(fetchActivePosts(activePage))
    };

    return (
        <div>
            <h1>Welcome to Homepage</h1>
            <Pagination
                totalPages={Math.ceil(totalData / showPerPage)}
                onPageChange={handlePaginationChange}
                activePage={currentPage}
            />
            <br />
            <br />
            <ul>{posts ? posts.map((post, index) => (
                <Card color='red'>
                    <Card.Content header={post.title} />
                    <Card.Content description={post.body} />
                    <Card.Content extra>
                        <Icon name='user' />{post.user ? post.user.name : ''}
                    </Card.Content>
                </Card>
            )) : "No data"}</ul>
        </div>
    )
}
export default Dashboard;