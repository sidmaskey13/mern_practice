import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PostList from '../Post/PostList';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <PostList />

        </div>
    )
}
export default Dashboard;