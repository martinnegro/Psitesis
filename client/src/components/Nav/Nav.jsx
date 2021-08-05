import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles, useTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
// import ForumIcon from '@material-ui/icons/Forum';
// import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import userAvatar from '../../assets/user.jpg'
import logo from '../../assets/Logo.png'
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logoMax: {
        flexGrow: 1
    },
  }));

export default function Nav () {

    const { isAuthenticated, user, logout } = useAuth0();

    const handleLogout = () => {
      logout({
        returnTo: window.location.origin,
      })
    }

    const history = useHistory()
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
            position="fixed" 
            style={{backgroundColor: 'purple'}}  
            className={clsx(classes.appBar, {[classes.appBarShift]: open,})} >
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {[classes.hide]: open,})}>
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.logoMax}>
                        <Avatar variant="square" src={logo} className={classes.square}/>
                    </div>
                    {
                      isAuthenticated ? (
                        <Avatar alt="User" src={user.picture} />
                      ) : <Avatar alt="User" src={userAvatar} />
                    }
                </Toolbar>
            </AppBar>

            <Drawer
            variant="permanent"
            className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open,})}
            classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open,}),}}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                  {['Home', /* 'Guía de Tesis', 'Foro', 'Colaboradores' */].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index === 0 ? <HomeOutlinedIcon onClick={()=>history.push('/home')} /> : null /*  index === 1 ? <BookOutlinedIcon /> : index === 2 ? <ForumIcon /> : <PeopleOutlineOutlinedIcon   /> */}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                {
                    isAuthenticated ? (

                  <ListItem button onClick={() => history.push('/post')} >
                      <ListItemIcon><AddCircleOutlineIcon/></ListItemIcon>
                      <ListItemText>Add Post</ListItemText>
                  </ListItem>
                    ) : null

                }
                <Divider />
                  <ListItem button onClick={handleLogout}>
                      <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                      <ListItemText>LogOut</ListItemText>
                  </ListItem>
            </Drawer>
        </div>
    )
}