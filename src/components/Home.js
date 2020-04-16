import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, Card, CardContent, Select, FormControl, InputLabel, TextField, Divider, Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {Add, Edit, Search} from '@material-ui/icons';
import { FIELDS_HEB, FIELDS_TYPE } from '../constants/data';
import converter from '../utils/converter'
import { getByColumn, getColumnsName, insertUpdate } from '../utils/requests'

import Form from './Form'

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
  searchBarCard:{
    marginTop: '30px'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: '30px',
    marginLeft: '30px'
  },
  formControl:{
    width: '200px',
    marginLeft: '20px',
  }
});

function Home() {
  const classes = useStyles();
  const [columns, setColumns] = useState([]);
  const [searchByCol, setSearchByCol] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editByCol, setEditByCol] = useState("");
  const [editValue, setEditValue] = useState("");
  const [missions, setMissions] = useState([]);
  const [type, setType] = useState(1);
  const [response, setResponse] = useState(null);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    async function fetchCols() {
      let colNames = await getColumnsName();
      setColumns(colNames.data);
      setSearchByCol(colNames.data[0]);
      setEditByCol(colNames.data[1]);
    }
    fetchCols();
  }, [])

  useEffect(() => {
    if(response)
        setNotify(true);
  }, [response]);

  const handleNotifierClose = () => {
      setNotify(false);
  };
  
  const handleSearch = async () => {
    let fetchRes = await getByColumn(searchByCol, searchValue);
    setMissions(fetchRes.data)
  }
  
  const handleEdit = async () => {
    let afterEditAllArr = missions.map((mission) => ({ 
      cartodb_id: mission.cartodb_id,
      [editByCol]: editValue
    }));
    let res = await insertUpdate(converter(afterEditAllArr, 'UPDATE'));
    setResponse(res);
    setMissions([]);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            City Control
          </Typography>
          <Button variant="contained" className={classes.button} color="secondary" startIcon={<Add/>} onClick={() => { setType(1); setMissions([]); }}>
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
        { type === 2 && <>
          <Card raised className={classes.searchBarCard}>
            <CardContent className={classes.searchBar}>
              <Typography variant="h6">חפש לפי:</Typography>
              <FormControl variant="filled" size="small" className={classes.formControl}>
                <InputLabel>בחר שדה</InputLabel>
                <Select
                  native
                  value={searchByCol}
                  onChange={e => setSearchByCol(e.target.value)}
                >
                  {columns.map((col, i) => <option key={i} value={col}>{FIELDS_HEB[col]}</option>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    label={`הזן ${FIELDS_HEB[searchByCol] || "ערך"}`}
                    type={FIELDS_TYPE[searchByCol]}
                    variant="filled"
                    size="small"
                />
              </FormControl>
              <Button variant="contained" className={classes.button} color="secondary" startIcon={<Search/>} onClick={handleSearch}>
                  חיפוש
              </Button>
            </CardContent>
          </Card>
          <Divider/>
          { missions.length > 0 && <div className={classes.editBar}>
              <Typography variant="h6">עדכן לכולם:</Typography>
              <FormControl variant="filled" size="small" className={classes.formControl}>
                <InputLabel>בחר שדה</InputLabel>
                <Select
                  native
                  value={editByCol}
                  onChange={e => setEditByCol(e.target.value)}
                >
                  {columns.slice(1).map((col, i) => <option key={i} value={col}>{FIELDS_HEB[col]}</option>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    label={`הזן ${FIELDS_HEB[editByCol] || "ערך"}`}
                    type={FIELDS_TYPE[editByCol]}
                    variant="filled"
                    size="small"
                />
              </FormControl>
              <Button variant="contained" className={classes.button} color="primary" startIcon={<Edit/>} onClick={handleEdit}>
                   עדכן ושמור
              </Button>
            </div>}</>}
        <CardContent>
          {(type === 1)? <Form/> : 
            <>
              <Typography variant="subtitle1">{`תוצאות: ${missions.length}`}</Typography>
              {missions.map((missionData, i) => <Form key={i} data={missionData}/>)}
            </>}
        </CardContent>
      </Card>
      <Snackbar open={notify} autoHideDuration={6000} onClose={handleNotifierClose}>
          {(response && response.status < 400) ? 
              <Alert onClose={handleNotifierClose} severity="success">
                  השדה עודכן ונשמר לכולם בהצלחה!
              </Alert> :
              <Alert onClose={handleNotifierClose} severity="error">
                  העדכון נכשל 
              </Alert>
          }
      </Snackbar>
    </>
  );
}

export default Home;
