import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

function Dashboard() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
export default Dashboard;