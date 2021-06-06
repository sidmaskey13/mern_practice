import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Icon, Label, Menu, Table, List, Header, Button } from 'semantic-ui-react'
import { getUpdateIndexSuccess, deletePostSuccess } from '../../redux/post/action';
import { fetchPosts, deletePost } from '../../redux/post/api';


function ListTable() {
    const posts = useSelector(state => state.posts.postList)
    const dispatch = useDispatch()

    const handleDelete = id => {
        dispatch(deletePost(id));
    }

    const handleEdit = index => {
        dispatch(getUpdateIndexSuccess(index));
    }

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])
    useEffect(() => {
        dispatch(fetchPosts());
    }, [posts])

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Body</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {posts ? posts.map((post, index) => (
                        <Table.Row key={post._id}>
                            <Table.Cell>
                                {post.title}
                            </Table.Cell>
                            <Table.Cell>{post.body}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                                <Button onClick={() => handleEdit(index)}>Edit</Button>
                            </Table.Cell>
                        </Table.Row>
                    )) : "No data"}
                </Table.Body>
            </Table>
        </div>
    )

}

export default ListTable;