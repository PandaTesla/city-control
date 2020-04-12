import React, {useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import {FIELDS, FIELDS_HEB} from '../constants/data';
import converter from '../utils/converter'

const useStyles = makeStyles({
    formDiv: {
        width: '50%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
    },
  });

function Form() {
    const classes = useStyles();
    const [values, setValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            firstname: "",
            lastname: "",
            phone1: null,
            phone2: null,
            city: "",
            street: "",
            building: null,
            entrance: "",
            floor: null,
            apartment: "",
            familymembers: null,
            lon: null,
            lat: null,
            the_geom: null,
            deliverstatus: "",
            numservingsdistributed: null,
            comments: "",
        }
      );

    const handleChangeValue = event => {
        const name = event.target.name;
        const newValue = event.target.value;
        setValues({ [name]: newValue });
    };
    
    const handleClick = () => {
        console.log(converter(values, 'INSERT', 213231))
    };

    return (
        <>
            <div className={classes.formDiv}>
                {FIELDS.map(field => 
                    <TextField
                        name={field}
                        label={FIELDS_HEB[field]}
                        onChange={handleChangeValue}
                    />
                )}
            </div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Save
            </Button>
        </>
    );
}

export default Form;
