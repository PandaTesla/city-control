import React, {useEffect} from 'react';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { makeStyles, fade } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {Add, Edit} from '@material-ui/icons';

import { logout } from './utils/requests'

import CreatePage from './components/CreatePage'
import EditPage from './components/EditPage'
import LoginPage from './components/LoginPage'

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: '20px'
  },
  link: {
    textDecoration: 'none'
  },
  logoutLink: {
    marginLeft: 'auto',
    textDecoration: 'none'
  },
  logoutBtn: {
    color: red[400],
    "&:hover": {
      backgroundColor: fade(red[400], theme.palette.action.hoverOpacity),
    },
  },
}));

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children, token, ...rest }) {
  return (
    <Route {...rest}
      render={({ location }) =>
        (token || localStorage.getItem('token')) ? (children) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />)}
    />
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const classes = useStyles();
  const location = useLocation();
  const query = useQuery();

  useEffect(() => {
    if(query.get("token")){
      localStorage.setItem('token', query.get("token"));
    }
  },[query.get("token")]);

  useEffect(() => {
    if(localStorage.getItem('token')){
      axios.defaults.headers.common.authorization = localStorage.getItem('token');
    }
  },[localStorage.getItem('token')]);

  return (
    <>
      { location.pathname !== '/login' && <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            City Control
          </Typography>
          <Link to="/" className={classes.link}>
            <Button variant="contained" className={classes.button} color="secondary" startIcon={<Add/>}>
              צור משימה חדשה
            </Button>
          </Link>
          <Link to="/edit" className={classes.link}>
            <Button variant="contained" className={classes.button} color="secondary" startIcon={<Edit/>}>
              ערוך משימה קיימת
            </Button>
          </Link>
          <Link to="/login" className={classes.logoutLink}>
            <Button className={classes.logoutBtn} onClick={logout}>
                <b>התנתק</b>
            </Button>
          </Link>
        </Toolbar>
      </AppBar> }
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <PrivateRoute exact path="/" token={query.get("token")}>
          <CreatePage/>
        </PrivateRoute>
        <PrivateRoute path="/edit">
          <EditPage/>
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
