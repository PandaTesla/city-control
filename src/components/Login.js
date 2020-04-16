import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, TextField, Avatar, Container, Card, CardContent} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';


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
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    console.log(username + password)
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Card raised className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlined/></Avatar>
        <Typography variant="h5">התחברות</Typography>
        <CardContent>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="שם משתמש"
                id="username"
                autoFocus
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="סיסמה"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
            >
                התחבר
            </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
