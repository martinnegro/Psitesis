import React from "react";

import { makeStyles } from "@material-ui/core/styles";
/* import Link from '@material-ui/core/Link'; */
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    "@media (max-width: 601px)": {
		margin: 0,
    padding: 0,
		  },
  },
  root2: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    "@media (max-width: 601px)": {
      margin: 0,
      padding: 0,
        },
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  container2: {
    display: "flex",
    "@media (max-width: 601px)": {
      margin: 0,
      padding: 0,
        },
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
  barResponsive: {
		"@media (max-width: 601px)": {
			display: "block",
			overflowX: "auto",
		  },  
	  }
}));
export default function BiosContainer({ id, userName, biography, imgProfile }) {
  const classes = useStyles();
  return (
    <Container className={classes.barResponsive}>
      <Link
        to={`/user/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Container className={classes.container2} width={20}>
          <div className={classes.root}>
            <Avatar
              variant="square"
              src={imgProfile}
              className={classes.square}
            >
              {" "}
            </Avatar>
          </div>
          
          <div className={classes.text}>
          <Typography variant = "h2">
            {userName}
            <Divider style={{ width: "250px" }} />
            </Typography>
            <Typography variant = "h2">
            {biography}
            <Divider style={{ width: "250px" }} />
            </Typography>
          </div>
          
        </Container>
      </Link>
    </Container>
  );
}
