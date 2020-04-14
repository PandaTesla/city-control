import React, {useReducer, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, CardContent, CardActions, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FIELDS_HEB } from '../constants/data';
import converter from '../utils/converter'
import { insertUpdate } from '../utils/requests'

const defaultState = {
    firstname: null,
    lastname: null,
    phone1: null,
    phone2: null,
    city: null,
    street: null,
    building: null,
    entrance: null,
    floor: null,
    apartment: null,
    familymembers: null,
    lon: null,
    lat: null,
    deliverstatus: null,
    numservingsdistributed: null,
    comments: null,
}

const useStyles = makeStyles({
    card: {
        margin: '0 30px',
        marginTop: '20px'
    },
    title: {
        position: 'relative',
    },
  });

function Form(props) {
    const classes = useStyles();
    const [response, setResponse] = useState(null);
    const [notify, setNotify] = useState(false);
    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), defaultState);

    useEffect(() => {
        setValues(props.data || defaultState);
    }, [props.data]);
    
    useEffect(() => {
        if(response)
            setNotify(true);
    }, [response]);

    const handleNotifierClose = () => {
        setNotify(false);
    };

    const handleChangeValue = event => {
        const name = event.target.name;
        const newValue = event.target.type === 'number' ? event.target.valueAsNumber : event.target.value;
        setValues({ [name]: newValue || null });
    };
    
    const handleSaveClick = async () => {
        // let filledValues = Object.keys(values)
        // .filter( key => values[key] && key !== 'cartodb_id' && key !== 'the_geom_webmercator' )
        // .reduce( (res, key) => Object.assign(res, { [key]: values[key] }), {} ); // filters fields that not filled
        let newValues = { ...values };
        delete newValues.cartodb_id;
        delete newValues.the_geom_webmercator;
        let type = values.cartodb_id ? "UPDATE" : "INSERT";
        if (newValues.lon && newValues.lat)
            newValues["the_geom"] = `ST_SetSRID(ST_MakePoint(${newValues.lon}, ${newValues.lat}),4326)`
        let res = await insertUpdate(converter(newValues, type, values.cartodb_id));
        setResponse(res);
    };

    return (
        <>
            <Card raised className={classes.card}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='firstname'
                                value={values['firstname'] || ""}
                                label={FIELDS_HEB['firstname']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='lastname'
                                value={values['lastname'] || ""}
                                label={FIELDS_HEB['lastname']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='phone1'
                                value={values['phone1'] || ""}
                                label={FIELDS_HEB['phone1']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='phone2'
                                value={values['phone2'] || ""}
                                label={FIELDS_HEB['phone2']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='city'
                                value={values['city'] || ""}
                                label={FIELDS_HEB['city']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='street'
                                value={values['street'] || ""}
                                label={FIELDS_HEB['street']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='building'
                                type='number'
                                value={values['building'] || ""}
                                label={FIELDS_HEB['building']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='entrance'
                                value={values['entrance'] || ""}
                                label={FIELDS_HEB['entrance']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='floor'
                                type='number'
                                value={values['floor'] || ""}
                                label={FIELDS_HEB['floor']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='apartment'
                                type='number'
                                value={values['apartment'] || ""}
                                label={FIELDS_HEB['apartment']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='familymembers'
                                type='number'
                                value={values['familymembers'] || ""}
                                label={FIELDS_HEB['familymembers']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='lon'
                                type='number'
                                value={values['lon'] || ""}
                                label={FIELDS_HEB['lon']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='lat'
                                type='number'
                                value={values['lat'] || ""}
                                label={FIELDS_HEB['lat']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='deliverstatus'
                                type='number'
                                value={values['deliverstatus'] || ""}
                                label={FIELDS_HEB['deliverstatus']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name='numservingsdistributed'
                                type='number'
                                value={values['numservingsdistributed'] || ""}
                                label={FIELDS_HEB['numservingsdistributed']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='comments'
                                value={values['comments'] || ""}
                                label={FIELDS_HEB['comments']}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        שמור
                    </Button>
                </CardActions>
            </Card>
            <Snackbar open={notify} autoHideDuration={6000} onClose={handleNotifierClose}>
                {(response?.status < 400) ? 
                    <Alert onClose={handleNotifierClose} severity="success">
                        המשימה נשמרה בהצלחה!
                    </Alert> :
                    <Alert onClose={handleNotifierClose} severity="error">
                        השמירה נכשלה
                    </Alert>
                }
            </Snackbar>
        </>
    );
}

export default Form;
