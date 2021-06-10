import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/bootstrap-v4.css'
import './App.css';

import PrivateRoute from './components/layout/PrivateRoute'
import Dashboard from './components/layout/Dashboard'

import Notifications from './components/layout/Notifications';
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import PostList from './components/Post/PostList';
import Homepage from './components/layout/Homepage';

export const SERVER_URL = "http://localhost:4000/api";

function App() {
  return (
    <Router>
      <Header />
      <Notifications />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
