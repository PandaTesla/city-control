import React,{useState, useEffect, useReducer} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, Card, CardContent, Select, FormControl, InputLabel, TextField, CircularProgress, LinearProgress} from '@material-ui/core';
import {Edit, Search} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { FIELDS_HEB, FIELDS_TYPE, BACKEND_AUTH_ERROR_MESSAGE } from '../constants/data';
import { convertAll } from '../utils/converter'
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
  const [missions, setMissions] = useState([]);
  const [search, setSearch] = useReducer((state, newState) => ({ ...state, ...newState }), {
    column: "",
    value: "",
    loading: false
  });
  const [editAll, setEditAll] = useReducer((state, newState) => ({ ...state, ...newState }), {
    column: "",
    value: "",
    search_col: "",
    search_val: "",
    loading: false
  });

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    async function fetchCols() {
      let colNamesRes = await getColumnsName();
      if(colNamesRes.status < 400){
        setColumns(colNamesRes.data);
        setSearch({column: colNamesRes.data[0]});
        setEditAll({column: colNamesRes.data[1]});
      } else if(colNamesRes.status === 401 || colNamesRes.data.reason === BACKEND_AUTH_ERROR_MESSAGE){
        logout();
        history.push("/login");
      }
    }
    fetchCols();
  }, [history])
  
  const handleSearch = async (event) => {
    event.preventDefault();
    setSearch({loading: true});
    let fetchRes = await getByColumn(search.column, search.value);
    setSearch({loading: false});
    if(fetchRes.status < 400){
      setMissions(fetchRes.data)
      setEditAll({
        search_col: search.column,
        search_val: search.value
      })
    } else if(fetchRes.status === 401 || fetchRes.data.reason === BACKEND_AUTH_ERROR_MESSAGE){
      logout();
      history.push("/login");
    } else enqueueSnackbar("החיפוש נכשל, נסה שוב", { variant: 'error' });
  }
  
  const handleEdit = async (event) => {
    event.preventDefault();
    setEditAll({loading: true});
    let res = await insertUpdate(convertAll(editAll.search_col, editAll.search_val, editAll.column, editAll.value));
    setEditAll({loading: false});
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
          <CardContent>
              <form onSubmit={handleSearch} className={classes.searchBar}>
                <Typography variant="h6">חפש לפי:</Typography>
                <FormControl variant="filled" color="secondary" size="small" className={classes.formControl}>
                  <InputLabel>בחר שדה</InputLabel>
                  <Select
                      native
                      value={search.column}
                      onChange={e => setSearch({column: e.target.value})}
                      >
                      {columns.map((col, i) => <option key={i} value={col}>{FIELDS_HEB[col]}</option>)}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                      value={search.value}
                      onChange={e => setSearch({value: e.target.value})}
                      label={`הזן ${FIELDS_HEB[search.column] || "ערך"}`}
                      type={FIELDS_TYPE[search.column]}
                      variant="filled"
                      color="secondary"
                      size="small"
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  disabled={search.loading}
                  color="secondary"
                  startIcon={<Search/>}>
                    חיפוש
                </Button>
              </form>
          </CardContent>
          {search.loading && <LinearProgress color="secondary"/>}
        </Card>
        { missions.length > 0 && <form onSubmit={handleEdit} className={classes.editBar}>
            <Typography variant="h6">עדכן לכולם:</Typography>
            <FormControl variant="filled" size="small" className={classes.formControl}>
              <InputLabel>בחר שדה</InputLabel>
              <Select
                  native
                  value={editAll.column}
                  onChange={e => setEditAll({column: e.target.value})}
              >
                  {columns.slice(1).map((col, i) => <option key={i} value={col}>{FIELDS_HEB[col]}</option>)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                  value={editAll.value}
                  onChange={e => setEditAll({value: e.target.value})}
                  label={`הזן ${FIELDS_HEB[editAll.column] || "ערך"}`}
                  type={FIELDS_TYPE[editAll.column]}
                  variant="filled"
                  size="small"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="primary"
              disabled={editAll.loading}
              startIcon={editAll.loading ? <CircularProgress size={24}/> : <Edit/>}>
                עדכן ושמור
            </Button>
        </form>}
        <CardContent>
            <Typography variant="subtitle1">{`תוצאות: ${missions.length}`}</Typography>
            {missions.map((missionData, i) => <Form key={i} data={missionData}/>)}
        </CardContent>
      </Card>
    </>
  );
}

export default EditPage;
