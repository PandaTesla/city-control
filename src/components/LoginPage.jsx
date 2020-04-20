import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, Avatar, Container, Card, CardContent, SvgIcon} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { blue } from "@material-ui/core/colors";
import { CARTO_OAUTH } from '../constants/routes';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  login: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText('#047ae6'),
    backgroundColor: '#047ae6',
    "&:hover": {
      backgroundColor: blue[800],
    }
  },
}));

function CartoIcon(props){
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg">
        <g fill="#FFF" fillRule="evenodd">
          <circle opacity=".1" cx="13.5" cy="13.5" r="13.5"/>
          <circle cx="13.5" cy="13.5" r="4.5"/>
        </g>
      </svg>
    </SvgIcon>
  )
}

function Login() {
  const classes = useStyles();

  const handleLogin = () => {
    window.location = CARTO_OAUTH;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Card raised className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlined/></Avatar>
        <Typography variant="h5">התחברות</Typography>
        <CardContent>
          <Button variant="contained" className={classes.login} startIcon={<CartoIcon/>} onClick={handleLogin}>
            התחבר עם Carto
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
