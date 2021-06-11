import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/bootstrap-v4.css'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/layout/PrivateRoute'
import Dashboard from './components/layout/Dashboard'

import Notifications from './components/layout/Notifications';
import NavHeader from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PostList from './components/Post/BloggerDashboard';
import Homepage from './components/layout/Homepage';
import Footer from './components/layout/Footer';
import { loadLoggedInUser } from "./redux/auth/api";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

export const SERVER_URL = "http://localhost:4000/api";

function App() {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatch(loadLoggedInUser())
  }, [])

  return (
    <Router>
      <NavHeader />
      <Notifications />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
