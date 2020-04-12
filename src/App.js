import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import './App.css';

import Form from './components/Form'


function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            City Control
          </Typography>
        </Toolbar>
      </AppBar>
      <Form/>
    </>
  );
}

export default App;
