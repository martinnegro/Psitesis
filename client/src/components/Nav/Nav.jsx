import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';

import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles, useTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
// import ForumIcon from '@material-ui/icons/Forum';
// import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";

import logo from "../../assets/Logo.png";
import { useHistory } from "react-router-dom";
import userAvatar from '../../assets/user.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from './../../redux/actions/actionsAuth';
//Submenu
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoMax: {
    flexGrow: 1,
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  ocult: {
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  ocultReverse: {
    "@media (min-width: 600px)": {
      display: "none",
    },
  },
  rootmenu: {
    width: 600,
    marginTop: "100%",
    bottom: "0",
  },
  tool2: {
    "@media (max-width: 600px)": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }
  },
}));

export default function Nav() {
	const { isAuthenticated, user } = useSelector((state) => state.authReducer); // Nueva forma de acceder al estado por combineReducer
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logOut());
	};

  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: "purple" }}
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar className={classes.tool2}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open })}
            className={classes.ocult}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoMax}>
            <Link to={`/user/${user?.user_id}`}>
              <Avatar variant="square" src={logo} className={classes.square} />
            </Link>
          </div>

          {isAuthenticated ? (
            <Link to={`/user/${user?.user_id}`}>
              <Avatar alt="User" src={user.picture} />
            </Link>
          ) : (
            <Link to={`/user/${user?.user_id}`}>
              <Avatar alt="User" src={userAvatar} />
            </Link>
          )}

          <div className={classes.ocultReverse}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
				<MenuItem>
                <IconButton
                  color="inherit"
                  aria-label="add"
                  onClick={handleClose}
                >
                  <HighlightOffIcon /><Typography variant="subtitle2" color="initial">CLOSE</Typography>
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton
                  color="inherit"
                  aria-label="add"
                  onClick={() => history.push("/post")}
                >
                  <AddCircleOutlineIcon /><Typography variant="subtitle2" color="initial">ADD POST</Typography>
                </IconButton>
              </MenuItem>
			  <MenuItem>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => history.push("/adminpanel")}
                >
                  <SettingsIcon /><Typography variant="subtitle2" color="initial">PANEL ADMIN</Typography>
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton edge="end" color="inherit" >
                  <ExitToAppIcon /><Typography variant="subtitle2" color="initial">LOGOUT</Typography>
                </IconButton>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, classes.ocult, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <ListItem button onClick={() => history.push("/home")}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/guiadetesis")}>
          <ListItemIcon>
            <BookOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Guía de Tesis</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/forum")}>
          <ListItemIcon>
            <ForumTwoToneIcon />
          </ListItemIcon>
          <ListItemText>Foro</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/colaborators")}>
          <ListItemIcon>
            <PeopleAltTwoToneIcon />
          </ListItemIcon>
          <ListItemText>Colaboradores</ListItemText>
        </ListItem>

        <Divider />
        {user?.roles?.includes('admin') ? (
          <>
            <ListItem button onClick={() => history.push("/post")}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>Agregar post</ListItemText>
            </ListItem>
            <ListItem button onClick={() => history.push("/adminpanel")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Panel de Administrador</ListItemText>
            </ListItem>
          </>
        ) : null}
        <Divider />

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>LogOut</ListItemText>
        </ListItem>
      </Drawer>
    </div>
  );
}
