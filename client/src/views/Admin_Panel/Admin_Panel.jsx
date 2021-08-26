import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import Nav from "../../components/Nav/Nav";
import AdminInstitutions from "./components/AdminInstitutions";
import AdminCategories from "./components/AdminCategories";
import AdminUsers from "./components/AdminUsers";
import CommentsReported from "./components/CommentsReported";
import NavBottom from "../../components/NavBottom/NavBottom";
import AdminArticles from "./components/AdminArticles";
import AdminTopics from "./components/AdminTopics";

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
  },
  tipoh2: {
    textTransform: "uppercase",
    "@media (max-width: 601px)": {
      marginLeft: 10,
      fontSize: "1.75rem",
      textAlign: "center",
    },
  },
  table2: {
    "@media (max-width: 601px)": {
      display: "block",
      overflowX: "auto",
    },
  },
}));

const Admin_Panel = () => {
  const classes = useStyles();

  return (
    <Container>
      <Nav />
      <Container className={classes.Admin_Panel}>
        <Typography variant="h2" color="initial" className={classes.tipoh2}>
          Panel de Administrador
        </Typography>
        <div className={classes.root}>
          <Accordion className={classes.table2}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              Usuarios
            </AccordionSummary>
            <AccordionDetails>
              <AdminUsers />
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
              <AdminInstitutions />
            </AccordionDetails>
          </Accordion>
          
          <AdminCategories />
          <AdminTopics/>
          <Accordion className={classes.table2}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              Comentarios y posts reportados
            </AccordionSummary>
            <AccordionDetails>
              <CommentsReported />
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.table2}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              Artículos Ocultos
            </AccordionSummary>
            <AccordionDetails>
              <AdminArticles />
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </Container>
  );
};

export default Admin_Panel;
