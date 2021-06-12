import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Icon, Label, Menu, Table, List, Header, Button, Pagination } from 'semantic-ui-react'
import { fetchUsers, deleteUser } from '../../redux/users/api';


function AdminUsersTable() {
    const { usersList, totalData, postCountList } = useSelector(state => state.users)


    const [currentPage, setCurrentPage] = useState(1);
    const [showPerPage] = useState(10);

    const dispatch = useDispatch()

    const handleDelete = id => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        dispatch(fetchUsers(currentPage));
    }, [])

    const margin5px = {
        margin: "5px"
    };

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage)
        dispatch(fetchUsers(activePage))
    };

    return (
        <div>
            <h1>Users table</h1>
            <Pagination
                totalPages={Math.ceil(totalData / showPerPage)}
                onPageChange={handlePaginationChange}
                activePage={currentPage}
            />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Active Posts</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {usersList ? usersList.map((user, index) => (
                        <Table.Row key={user._id}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.totalPost ? user.totalPost : 0}</Table.Cell>
                            <Table.Cell>{user.userType ? user.userType : "blogger"}</Table.Cell>
                            <Table.Cell>
                                {user.userType == 'admin' ? "" : <div style={margin5px}><Button onClick={() => handleDelete(user._id)}>Delete</Button></div>}
                            </Table.Cell>
                        </Table.Row>
                    )) : "No data"}
                </Table.Body>
            </Table>
        </div>
    )

}

export default AdminUsersTable;