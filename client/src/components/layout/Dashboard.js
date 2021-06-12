import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import BloggerDashboard from '../Post/BloggerDashboard';
import AdminDashboard from '../admin/AdminDashboard';

function Dashboard() {
    const user = useSelector(state => state.auth.user)
    console.log(user)

    return (
        <div>
            {user ? user.userType == 'admin' ? <AdminDashboard /> : <BloggerDashboard /> : ''}
        </div>
    )
}
export default Dashboard;