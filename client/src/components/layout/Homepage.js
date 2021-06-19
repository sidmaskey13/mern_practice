import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePosts, sendLikeData } from '../../redux/post/api';
import { Card, Icon, Pagination, Input, Grid, Button } from 'semantic-ui-react'


function Dashboard() {
    const posts = useSelector(state => state.posts.postList)
    const totalData = useSelector(state => state.posts.totalData)
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPerPage] = useState(5);
    const [likePostId, setLikePostId] = useState("");

    useEffect(() => {
        dispatch(fetchActivePosts(currentPage, ""));
    }, [])

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage)
        dispatch(fetchActivePosts(activePage, ""))
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        dispatch(fetchActivePosts(1, search))
        setCurrentPage(1)
    }

    const handleLike = (id, index, e) => {
        e.preventDefault();
        dispatch(sendLikeData(id, index));
        console.log(index)
    }

    return (
        <div>
            <h1>Welcome to Homepage</h1>
            <Grid>
                <Grid.Column floated='left' width={5}>
                    <Pagination
                        totalPages={Math.ceil(totalData / showPerPage)}
                        onPageChange={handlePaginationChange}
                        activePage={currentPage}
                    />
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                    <Input
                        onChange={e => setSearch(e.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                        focus
                        placeholder='Search...'
                    />
                    <Button onClick={handleSearch} icon>
                        <Icon name='search' />
                    </Button>
                </Grid.Column>
            </Grid>


            <br />
            <br />
            <ul>{posts ? posts.map((post, index) => (
                <Card fluid color='red'>
                    <Card.Content header={post.title} />
                    <Card.Content description={post.body} />
                    <Card.Content extra>
                        <Icon name='user' />{post.user ? post.user.name : ''} <br />

                        {post.likes ?
                            post.likes.includes(user ? user._id : "") ?
                                <Button onClick={e => handleLike(post._id, index, e)}><Icon name='thumbs up' />
                                    {post.likes ? post.likes.length : '0'} Liked</Button> :
                                <Button onClick={e => handleLike(post._id, index, e)}><Icon name='thumbs up' />{post.likes ? post.likes.length : '0'}</Button> :
                            <Button onClick={e => handleLike(post._id, index, e)}><Icon name='thumbs up' />{post.likes ? post.likes.length : '0'}</Button>}
                    </Card.Content>
                </Card>
            )) : "No data"}</ul>
        </div>
    )
}
export default Dashboard;