import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Icon, Label, Menu, Table, List, Header, Button, Pagination } from 'semantic-ui-react'
import { getUpdateIndexSuccess, deletePostSuccess } from '../../redux/post/action';
import { fetchPosts, deletePost } from '../../redux/post/api';


function ListTable() {
    const posts = useSelector(state => state.posts.postList)
    const postIndex = useSelector(state => state.posts.currentIndex)
    const totalData = useSelector(state => state.posts.totalData)

    const [currentPage, setCurrentPage] = useState(1);
    const [showPerPage] = useState(10);

    const dispatch = useDispatch()

    const handleDelete = id => {
        dispatch(deletePost(id));
    }

    const handleEdit = index => {
        dispatch(getUpdateIndexSuccess(index));
    }

    useEffect(() => {
        dispatch(fetchPosts(currentPage));
    }, [postIndex == -1])

    const margin5px = {
        margin: "5px"
    };


    // const indexOfLastData = currentPage * showPerPage;
    // const indexOfFirstData = indexOfLastData - showPerPage;
    // const currentData = posts.slice(indexOfFirstData, indexOfLastData)

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage)
        dispatch(fetchPosts(activePage))
    };

    return (
        <div>
            <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(totalData / showPerPage)}
                onPageChange={handlePaginationChange}
                activePage={currentPage}
            />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Body</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Tags</Table.HeaderCell>
                        <Table.HeaderCell>Active</Table.HeaderCell>
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
                            <Table.Cell>{post.category ? post.category.title : '-'}</Table.Cell>
                            <Table.Cell>{post.tags ? post.tags.map(i => <div style={margin5px} class="ui blue label">{i}</div>) : "-"}</Table.Cell>
                            <Table.Cell>{post.is_active ? post.is_active : '-'}</Table.Cell>
                            <Table.Cell>
                                <div style={margin5px}><Button onClick={() => handleDelete(post._id)}>Delete</Button></div>
                                <div style={margin5px}><Button onClick={() => handleEdit(index)}>Edit</Button></div>
                            </Table.Cell>
                        </Table.Row>
                    )) : "No data"}
                </Table.Body>
            </Table>
        </div>
    )

}

export default ListTable;