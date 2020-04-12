import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Tabs, Tab} from '@material-ui/core';
import './App.css';

import Form from './components/Form'

const useStyles = makeStyles({
  tabs: {
      margin: '0 auto',
  },
});

function App() {
  const classes = useStyles();
  const [tabNum, setTabNum] = useState(0);

  const handleTabChange = (event, newTabNum) => {
    setTabNum(newTabNum)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            City Control
          </Typography>
          <Tabs value={tabNum} onChange={handleTabChange} className={classes.tabs}>
            <Tab label="צור משימה חדשה"/>
            <Tab label="ערוך משימה קיימת"/>
          </Tabs>
        </Toolbar>
      </AppBar>
      <Form type={tabNum}/>
    </>
  );
}

export default App;
