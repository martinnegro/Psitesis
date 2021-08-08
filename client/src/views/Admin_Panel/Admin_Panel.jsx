import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';

import Nav from "../../components/Nav/Nav";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    Home: {
      // marginLeft: theme.spacing(15),
      marginTop: theme.spacing(12),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }
}));

const Admin_Panel = () => {
    const classes = useStyles();

    return (
        <Container >
            <Nav />
                <Container className={classes.Home}>
                    <Typography
                    variant="h2" color="initial"
                    >
                    Panel de Administrador
                    </Typography>
                </Container>
          
        </Container>
    )
}

export default Admin_Panel;