import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, Card, CardContent, Select, FormControl, InputLabel, TextField} from '@material-ui/core';
import {Add, Edit, Search} from '@material-ui/icons';
import './App.css';
import { FIELDS_HEB } from './constants/data';
import { getByColumn, getColumnsName } from './utils/requests'

import Form from './components/Form'

const useStyles = makeStyles({
  card: {
    width: '60%',
    margin: '0 auto',
    marginTop: '20px'
  },
  title: {
    textAlign: 'center',
    marginTop: 'inherit',
  },
  button: {
    marginLeft: '20px'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: '20px 40px 0px 40px'
  },
  formControl:{
    width: '200px',
  }
});

function App() {
  const classes = useStyles();
  const [columns, setColumns] = useState([]);
  const [searchByCol, setSearchByCol] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [missions, setMissions] = useState([]);
  const [type, setType] = useState(1);

  useEffect(() => {
    async function fetchCols() {
      let columns = await getColumnsName();
      setColumns(columns.data);
    }
    fetchCols();
  }, [])
  
  const handleSearch = async () => {
    let fetchRes = await getByColumn(searchByCol, searchValue);
    setMissions(fetchRes.data)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            City Control
          </Typography>
          <Button variant="contained" className={classes.button} color="secondary" startIcon={<Add/>} onClick={() => setType(1)}>
            צור משימה חדשה
          </Button>
          <Button variant="contained" className={classes.button} color="secondary" startIcon={<Edit/>} onClick={() => setType(2)}>
            ערוך משימה קיימת
          </Button>
        </Toolbar>
      </AppBar>
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          {(type === 1)? "צור משימה חדשה" : "ערוך משימה קיימת"}
        </Typography>
        { type === 2 && <div className={classes.searchBar}>
          <Typography variant="h6">חפש לפי:</Typography>
          <FormControl variant="filled" size="small" className={classes.formControl}>
            <InputLabel>בחר שדה</InputLabel>
            <Select
              native
              value={searchByCol}
              size="small"
              onChange={e => setSearchByCol(e.target.value)}
            >
              <option aria-label="None" value="" />
              {columns.map((col, i) => <option key={i} value={col}>{FIELDS_HEB[col]}</option>)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
                name='firstname'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                label={`הזן ${FIELDS_HEB[searchByCol] || "ערך"}`}
                variant="filled"
                size="small"
            />
          </FormControl>
          <Button variant="contained" className={classes.button} color="secondary" startIcon={<Search/>} onClick={handleSearch}>
              חיפוש
          </Button>
        </div>}
        <CardContent>
          {(type === 1)? <Form/> : missions.map((missionData, i) => <Form key={i} data={missionData}/>)}
        </CardContent>
      </Card>
    </>
  );
}

export default App;
