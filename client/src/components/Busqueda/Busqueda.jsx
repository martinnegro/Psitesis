import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 700,
        marginTop: "20px",
        marginBottom: "30px",
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
}))


export default function Search (){

const classes = useStyles();
const [ search, setSearch ] = useState('')

const onChange = (e) => {
    if (e.target.name === 'search') setSearch(e.target.value)
}

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
            className={classes.input}
            placeholder="Escribí aquí el artículo que deseas encontrar"
            onChange={onChange}
            name='search'
            value={search}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}