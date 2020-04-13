import React, {useReducer, useEffect, useState} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { TextField, Button, InputBase, Grid, Card, CardContent, CardActions, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { FIELDS_HEB } from '../constants/data';
import converter from '../utils/converter'
import {insertUpdate, getByID} from '../utils/requests'

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
    deliverstatus: "",
    numservingsdistributed: "",
    comments: "",
}

const useStyles = makeStyles(theme => ({
    card: {
        width: '50%',
        margin: '0 auto',
        marginTop: '20px'
    },
    title: {
        position: 'relative',
    },
    searchDiv: {
        display: 'flex'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
  }));

function Form(props) {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState();
    const [cartodbId, setCartodbId] = useState();
    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), defaultState);

    useEffect(() => {
        setValues(defaultState);
    }, [props.type]);

    const handleChangeValue = event => {
        const name = event.target.name;
        const newValue = event.target.type === 'number' ? event.target.valueAsNumber : event.target.value;
        setValues({ [name]: newValue });
    };
    
    const handleSearchClick = async () => {
        let fetchedFields = await getByID(searchValue);
        setCartodbId(fetchedFields.cartodb_id)
        delete fetchedFields.cartodb_id
        delete fetchedFields.the_geom_webmercator
        setValues(fetchedFields);
    };
    
    const handleSaveClick = () => {
        let filledValues = Object.keys(values)
        .filter( key => values[key])
        .reduce( (res, key) => Object.assign(res, { [key]: values[key] }), {} ); // filters fields that not filled
        let type = props.type === 0 ? "INSERT": "UPDATE";
        if (filledValues.lon && filledValues.lat)
        filledValues["the_geom"] = `ST_SetSRID(ST_MakePoint(${filledValues.lon}, ${filledValues.lat}),4326)`
        insertUpdate(converter(filledValues, type, cartodbId));
    };

    return (
        <>
            <Card raised className={classes.card}>
                <AppBar position="static" color="primary" className={classes.title}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                        {(props.type === 1)? "ערוך משימה קיימת" : "צור משימה חדשה"}
                        </Typography>
                        { props.type === 1 && <div className={classes.searchDiv}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <Search />
                                </div>
                                <InputBase
                                placeholder="חיפוש לפי מזהה"
                                type="number"
                                onChange={e => setSearchValue(e.target.value)}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <Button variant="contained" color="secondary" onClick={handleSearchClick}>
                            פתח
                            </Button>
                        </div>}
                    </Toolbar>
                </AppBar>
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
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        שמור
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default Form;
