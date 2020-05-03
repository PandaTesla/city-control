import React,{useState, useReducer} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, Card, CardContent, Select, FormControl, InputLabel, TextField, CircularProgress, LinearProgress} from '@material-ui/core';
import {Edit, Search} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { FIELDS, FIELDS_HEB, FIELDS_TYPE } from '../constants/data';
import { fetchMissionsBy, updateAll, logout } from '../utils/requests';

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
  const [missions, setMissions] = useState([]);
  const [search, setSearch] = useReducer((state, newState) => ({ ...state, ...newState }), {
    column: FIELDS[0],
    value: "",
    loading: false
  });
  const [editAll, setEditAll] = useReducer((state, newState) => ({ ...state, ...newState }), {
    column: FIELDS[1],
    value: "",
    search_col: "",
    search_val: "",
    loading: false
  });

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  
  const handleSearch = async (event) => {
    event.preventDefault();
    setSearch({loading: true});
    let fetchRes = await fetchMissionsBy(search.column, search.value);
    setSearch({loading: false});
    if(fetchRes.status < 400){
      setMissions(fetchRes.data)
      setEditAll({
        search_col: search.column,
        search_val: search.value
      })
    } else if(fetchRes.status === 401){
      logout();
      history.push("/login");
    } else enqueueSnackbar("החיפוש נכשל, נסה שוב", { variant: 'error' });
  }
  
  const handleEdit = async () => {
    setEditAll({loading: true});
    let res = await updateAll(editAll.search_col, editAll.search_val, editAll.column, editAll.value);
    setEditAll({loading: false});
    if (res.status < 400){
      enqueueSnackbar("השדה עודכן ונשמר לכולם בהצלחה!", { variant: 'success' });
      setMissions([]);
    }
    else {
      enqueueSnackbar("העדכון נכשל", { variant: 'error' });
      if(res.status === 401){
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
                      {FIELDS.filter(fld => !["lon", "lat"].includes(fld)).map((fld, i) => <option key={i} value={fld}>{FIELDS_HEB[fld]}</option>)}
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
        { missions.length > 0 && <div className={classes.editBar}>
            <Typography variant="h6">עדכן לכולם:</Typography>
            <FormControl variant="filled" size="small" className={classes.formControl}>
              <InputLabel>בחר שדה</InputLabel>
              <Select
                  native
                  value={editAll.column}
                  onChange={e => setEditAll({column: e.target.value})}
              >
                  {FIELDS.slice(1).map((fld, i) => <option key={i} value={fld}>{FIELDS_HEB[fld]}</option>)}
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
              startIcon={editAll.loading ? <CircularProgress size={24}/> : <Edit/>}
              onClick={handleEdit}>
                עדכן ושמור
            </Button>
        </div>}
        <CardContent>
            <Typography variant="subtitle1">{`תוצאות: ${missions.length}`}</Typography>
            {missions.map((missionData) => <Form key={missionData.cartodb_id} data={missionData}/>)}
        </CardContent>
      </Card>
    </>
  );
}

export default EditPage;
