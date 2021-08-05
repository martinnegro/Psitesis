import React from 'react'
import Form from './Form'
import { Paper, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme =>({
    formContent:{
        margin:theme.spacing(6),
        padding:theme.spacing(4),
        background: 'purple',
    }
}))

export default function ContentForm() {
    const classes = useStyles();
    return (

        <Paper className={classes.formContent}>
        <Form/>
        </Paper>
    )
}
