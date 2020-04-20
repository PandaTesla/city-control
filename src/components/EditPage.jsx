import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, Card, CardContent, Select, FormControl, InputLabel, TextField} from '@material-ui/core';
import {Edit, Search} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { FIELDS_HEB, FIELDS_TYPE, BACKEND_AUTH_ERROR_MESSAGE } from '../constants/data';
import converter from '../utils/converter'
import { getByColumn, getColumnsName, insertUpdate, logout } from '../utils/requests'

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

function EditPage() {
  const classes = useStyles();
  const [columns, setColumns] = useState([]);
  const [searchByCol, setSearchByCol] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editByCol, setEditByCol] = useState("");
  const [editValue, setEditValue] = useState("");
  const [missions, setMissions] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    async function fetchCols() {
      let colNamesRes = await getColumnsName();
      if(colNamesRes.status < 400){
        setColumns(colNamesRes.data);
        setSearchByCol(colNamesRes.data[0]);
        setEditByCol(colNamesRes.data[1]);
      } else if(colNamesRes.status === 401 || colNamesRes.data.reason === BACKEND_AUTH_ERROR_MESSAGE){
        logout();
        history.push("/login");
      }
    }
    fetchCols();
  }, [])
  
  const handleSearch = async () => {
    let fetchRes = await getByColumn(searchByCol, searchValue);
    if(fetchRes.status < 400)
      setMissions(fetchRes.data)
    else if(fetchRes.status === 401 || fetchRes.data.reason === BACKEND_AUTH_ERROR_MESSAGE){
      logout();
      history.push("/login");
    } else enqueueSnackbar("החיפוש נכשל, נסה שוב", { variant: 'error' });
  }
  
  const handleEdit = async () => {
    let afterEditAllArr = missions.map((mission) => ({ 
      cartodb_id: mission.cartodb_id,
      [editByCol]: editValue
    }));
    let res = await insertUpdate(converter(afterEditAllArr, 'UPDATE'));
    if (res.status < 400){
      enqueueSnackbar("השדה עודכן ונשמר לכולם בהצלחה!", { variant: 'success' });
      setMissions([]);
    }
    else {
      enqueueSnackbar("העדכון נכשל", { variant: 'error' });
      if(res.status === 401 || res.data.reason === BACKEND_AUTH_ERROR_MESSAGE){
        logout();
        history.push("/login");
      }
    }
  }

  return (
    <>
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          ערוך משימה קיימת
        </Typography>
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
        </div>}
        <CardContent>
            <Typography variant="subtitle1">{`תוצאות: ${missions.length}`}</Typography>
            {missions.map((missionData, i) => <Form key={i} data={missionData}/>)}
        </CardContent>
      </Card>
    </>
  );
}

export default EditPage;
