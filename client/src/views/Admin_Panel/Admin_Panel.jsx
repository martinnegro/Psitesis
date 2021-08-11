import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Nav from "../../components/Nav/Nav";
import AdminInstitutions from './components/AdminInstitutions';
import AdminCategories from './components/AdminCategories';

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    Admin_Panel: {
      // marginLeft: theme.spacing(15),
      marginTop: theme.spacing(12),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    root: {
        width: "100%",
    }
}));

const Admin_Panel = () => {
    const classes = useStyles();

    return (
        <Container >
            <Nav />
                <Container className={classes.Admin_Panel}>
                    <Typography
                    variant="h2" color="initial"
                    >
                    Panel de Administrador
                    </Typography>
                    <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Usuarios
                        </AccordionSummary>
                        <AccordionDetails>
                            
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Instituciones
                        </AccordionSummary>
                        <AccordionDetails>
                            <AdminInstitutions/>
                        </AccordionDetails>
                    </Accordion>
                    <AdminCategories/>
                    </div>
                </Container>      
        </Container>
    )
}

export default Admin_Panel;