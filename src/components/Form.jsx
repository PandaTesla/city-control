import React, {useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { FIELDS_HEB } from '../constants/data';
import converter from '../utils/converter'
import { insertUpdate } from '../utils/requests'

const defaultState = {
    cartodb_id: "",
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
    deliverstatus: "",
    numservingsdistributed: "",
    comments: "",
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
    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), defaultState);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setValues(props.data || defaultState);
    }, [props.data]);

    const handleChangeValue = event => {
        const name = event.target.name;
        const newValue = (event.target.type === 'number') ? event.target.valueAsNumber : event.target.value;
        setValues({ [name]: newValue });
    };
    
    const handleSaveClick = async () => {
        // let filledValues = Object.keys(values)
        // .filter( key => values[key] && key !== 'cartodb_id' && key !== 'the_geom_webmercator' )
        // .reduce( (res, key) => Object.assign(res, { [key]: values[key] }), {} ); // filters fields that not filled
        let newValues = { ...values };
        delete newValues.the_geom_webmercator;
        let type = newValues.cartodb_id ? "UPDATE" : "INSERT";
        if (newValues.lon && newValues.lat)
            newValues["the_geom"] = `ST_SetSRID(ST_MakePoint(${newValues.lon}, ${newValues.lat}),4326)`
        let res = await insertUpdate(converter([newValues], type));
        if (res.status < 400)
            enqueueSnackbar("המשימה נשמרה בהצלחה!", { variant: 'success' });
        else enqueueSnackbar("השמירה נכשלה", { variant: 'error' });
        if(type === 'INSERT' && res.status < 400){
            setValues(defaultState);
        }
    };

    return (
        <>
            <Card raised className={classes.card}>
                <CardHeader subheader={values.cartodb_id}/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                name='firstname'
                                value={values['firstname']}
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
                                value={values['lastname']}
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
                                value={values['phone1']}
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
                                value={values['phone2']}
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
                                value={values['city']}
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
                                value={values['street']}
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
                                value={values['building']}
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
                                value={values['entrance']}
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
                                value={values['floor']}
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
                                value={values['apartment']}
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
                                value={values['familymembers']}
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
                                value={values['lon']}
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
                                value={values['lat']}
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
                                value={values['deliverstatus']}
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
                                value={values['numservingsdistributed']}
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
                                value={values['comments']}
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
                    <Button variant="contained" color="primary" startIcon={<Save/>} onClick={handleSaveClick}>
                        שמור
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

Form.propTypes = {
    data: PropTypes.object
};

export default Form;
