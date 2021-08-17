import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import SettingsIcon from "@material-ui/icons/Settings";

import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
//submenu
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  ocult: {
    "@media (min-width: 601px)": {
      display: "none",
    },
  },
  tool: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function NavBottom() {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        className={`${classes.appBar} ${classes.ocult}`}
        style={{ backgroundColor: "purple" }}
      >
        <Toolbar className={classes.tool}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push("/home")}
          >
            <HomeOutlinedIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="add"
            onClick={() => history.push("/post")}
          >
            <AddCircleOutlineIcon />
          </IconButton>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => history.push("/guiadetesis")}
          >
            <BookOutlinedIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => history.push("/adminpanel")}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => history.push("/colaborators")}
          >
            <PeopleAltTwoToneIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            aqui
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
