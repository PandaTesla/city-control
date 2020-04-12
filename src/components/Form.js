import React, {useReducer, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { FIELDS, FIELDS_HEB } from '../constants/data';
import converter from '../utils/converter'

const defaultState = {
    firstname: "",
    lastname: "",
    phone1: "",
    phone2: "",
    city: "",
    street: "",
    building: "",
    entrance: "",
    floor: "",
    apartment: "",
    familymembers: "",
    lon: "",
    lat: "",
    the_geom: "",
    deliverstatus: "",
    numservingsdistributed: "",
    comments: "",
}

const useStyles = makeStyles({
    formDiv: {
        width: '50%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
    },
    searchBar: {
        marginStart: '20%'
    },
    saveBtn:{
        marginTop: '20px',
    }
  });

function Form(props) {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState();
    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), defaultState);

    useEffect(() => {
        setValues(defaultState);
    }, [props.type]);

    const handleChangeValue = event => {
        const name = event.target.name;
        const newValue = event.target.type === 'number' ? event.target.valueAsNumber : event.target.value;
        setValues({ [name]: newValue });
    };
    
    const handleSearchClick = () => {
        console.log(searchValue)
    };
    
    const handleSaveClick = () => {
        let filledValues = Object.keys(values)
        .filter( key => values[key])
        .reduce( (res, key) => (res[key] = values[key], res), {} );// filters fields that not filled
        console.log(converter(filledValues, 'INSERT', 213231))
    };

    return (
        <>
            { props.type === 1 && <div>
                <TextField
                    className={classes.searchBar}
                    label="חיפוש לפי מזהה"
                    type="number"
                    onChange={e => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="text" color="primary" onClick={handleSearchClick}>
                 חיפוש
                </Button>
            </div>}
            <div className={classes.formDiv}>
                {FIELDS.map(field => (["building","floor","apartment","familymembers","lon","lat","deliverstatus","numservingsdistributed"].includes(field)) ?
                    (<TextField
                        name={field}
                        value={values[field]}
                        type='number'
                        label={FIELDS_HEB[field]}
                        onChange={handleChangeValue}
                    />) :
                    (<TextField
                        name={field}
                        value={values[field]}
                        label={FIELDS_HEB[field]}
                        onChange={handleChangeValue}
                    />)
                )}
                <Button variant="contained" color="primary" className={classes.saveBtn} onClick={handleSaveClick}>
                    שמור
                </Button>
            </div>
        </>
    );
}

export default Form;
