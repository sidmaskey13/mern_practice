import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

function Login() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(login())
    }
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <div>
            <h1>Login</h1>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    )
}
export default Login;