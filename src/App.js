import React from 'react';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {Add, Edit} from '@material-ui/icons';

import { logout } from './utils/requests';

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
    border: `1px solid ${fade(red[400], 0.5)}`,
    "&:hover": {
      backgroundColor: fade(red[400], theme.palette.action.hoverOpacity),
      border: `1px solid ${red[400]}`
    },
    "&$disabled": {
      border: `1px solid ${theme.palette.action.disabled}`
    }
  },
}));

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest}
      render={({ location }) =>
        // eslint-disable-next-line no-constant-condition
        (true) ? (children) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />)}
    />
  );
}

function App() {
  const classes = useStyles();
  const location = useLocation();

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
            <Button variant="outlined" className={classes.logoutBtn} onClick={logout}>
                <b>התנתק</b>
            </Button>
          </Link>
        </Toolbar>
      </AppBar> }
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <PrivateRoute exact path="/">
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
