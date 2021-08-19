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
import MenuIcon from "@material-ui/icons/Menu";
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';
import Typography from '@material-ui/core/Typography'

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
          ><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <HomeOutlinedIcon fontSize='10px' />
            <Typography color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>Home</Typography>
            </div>
          </IconButton>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => history.push("/guiadetesis")}
          >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <BookOutlinedIcon fontSize='10px' />
            <Typography color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>Guia de tesis</Typography>
            </div>
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => history.push('/forum')}
          >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ForumTwoToneIcon fontSize='10px' />
            <Typography color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>Foro</Typography>
          </div>
          </IconButton>
          
          <IconButton
                edge="end"
                color="inherit"
                onClick={() => history.push("/colaborators")}
                
              >
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <PeopleAltTwoToneIcon  fontSize='10px' />
                <Typography color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>colaboradores</Typography>
                </div>                
              </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
