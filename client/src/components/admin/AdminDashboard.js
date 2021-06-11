import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ListForm from '../Post/ListForm';
import AdminListTable from './AdminPostTable';

function Dashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ListForm />
            <hr />
            <AdminListTable />

        </div>
    )
}
export default Dashboard;