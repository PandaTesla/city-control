import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Card, CardContent} from '@material-ui/core';

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
  }
});

function CreatePage() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
            צור משימה חדשה
        </Typography>
        <CardContent>
            <Form/>
        </CardContent>
      </Card>
    </>
  );
}

export default CreatePage;
