import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';

import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Icon, makeStyles, useTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
// import ForumIcon from '@material-ui/icons/Forum';
// import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';

import logo from '../../assets/Logo.png';
import { useHistory } from 'react-router-dom';
import userAvatar from '../../assets/user.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from './../../redux/actions/actionsAuth';
//Submenu
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { grey, purple } from '@material-ui/core/colors';
import { markAsRead } from '../../redux/actions/actionsNotifications';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

const drawerWidth = 270;

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
		'flexGrow': 1,
		'@media (max-width: 600px)': {
			display: 'none',
		},
	},
	ocult: {
		'@media (max-width: 600px)': {
			display: 'none',
		},
	},
	ocultReverse: {
		'@media (min-width: 600px)': {
			display: 'none',
		},
	},
	rootmenu: {
		width: 600,
		marginTop: '100%',
		bottom: '0',
	},
	tool2: {
		'@media (max-width: 600px)': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
	scrollBar: {
		'&::-webkit-scrollbar': {
			width: '0.4em',
		},
		'&::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			outline: '1px solid slategrey',
		},
	},
	ali: {
		flexGrow: 1,
		align: 'center',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: grey[600],
		overflow: 'auto',
		justify: 'center',
	},
	ali2: {
		flexGrow: 1,
		whiteSpace: 'normal',
	},
}));

export default function Nav() {
	const { isAuthenticated, user } = useSelector((state) => state.authReducer); // Nueva forma de acceder al estado por combineReducer
	const { notifications } = useSelector((state) => state.notificationsReducer);
	const [orderedNotifications, setOrderedNotifications] = useState([]);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logOut());
	};

	const orderDate = (object) => {
		return object.sort((a, b) => {
			if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()) {
				return 1;
			}
			if (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) {
				return -1;
			}
			return 0;
		});
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

	useEffect(() => {
		setOrderedNotifications(orderDate(notifications));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notifications]);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [anchorEl2, setAnchorEl2] = React.useState(null);

	const handleClick2 = (event) => {
		setAnchorEl2(event.currentTarget);
	};

	const handleClose2 = () => {
		setAnchorEl2(null);
	};
	const [anchorNotifications, setAnchorNotifications] = React.useState(null);

	const handleClickNotifications = (event) => {
		setAnchorNotifications(event.currentTarget);
		dispatch(markAsRead());
	};
	const handleCloseNotifications = () => {
		setAnchorNotifications(null);
	};

	const calcDate = (time) => {
		var date = new Date(time),
			diff = (new Date().getTime() - date.getTime()) / 1000,
			day_diff = Math.floor(diff / 86400);

		if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

		return (
			(day_diff === 0 &&
				((diff < 60 && 'Ahora mismo.') ||
					(diff < 120 && 'Hace 1 minuto.') ||
					(diff < 3600 && `Hace ${Math.floor(diff / 60)} minutos.`) ||
					(diff < 7200 && 'Hace 1 hora.') ||
					(diff < 86400 && `Hace ${Math.floor(diff / 3600)} horas.`))) ||
			(day_diff === 1 && 'Ayer') ||
			(day_diff < 7 && `Hace ${day_diff} dias.`) ||
			(day_diff < 31 && `Hace ${Math.ceil(day_diff / 7)} semanas.`)
		);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				style={{ backgroundColor: 'purple' }}
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
						{/* <Link to={`/user/${user?.user_id}`}> */}
						<Avatar variant="square" src={logo} className={classes.square} />
						{/* </Link> */}
					</div>

					{isAuthenticated ? (
						<>
							<IconButton
								onClick={handleClickNotifications}
								aria-label="show-new-notifications"
								aria-haspopup="true"
								color="inherit"
							>
								<Badge
									badgeContent={
										orderedNotifications.filter((noty) => noty.read === false)
											.length
									}
									color="secondary"
								>
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<Menu
								id="show-new-notifications"
								anchorEl={anchorNotifications}
								keepMounted
								open={Boolean(anchorNotifications)}
								onClose={handleCloseNotifications}
							>
								<MenuItem>
									<span
										color="inherit"
										aria-label="add"
										style={{
											flexGrow: 1,
											align: 'center',
											display: 'flex',
											alignItems: 'center',
											textAlign: 'center',
											color: grey[600],
											overflow: 'auto',
											justify: 'center',
										}}
									>
										<Typography
											variant="subtitle2"
											color="initial"
											className={classes.ali}
											style={{
												align: 'center',
												display: 'flex',
												justifyContent: 'center',
												fontSize: '14px',
												textTransform: 'uppercase',
												textAlign: 'center',
												color: purple[500],
											}}
										>
											Notificaciones
										</Typography>
									</span>
								</MenuItem>
								{orderedNotifications.slice(0, 10).map((notification) => {
									return (
										<MenuItem>
											<Link
												to={notification.link}
												style={{
													textDecoration: 'none',
												}}
											>
												<span
													color="inherit"
													aria-label="add"
													className={classes.ali}
												>
													<Avatar
														alt="User"
														src={notification.sender.user_img_profile}
													/>
													&nbsp;
													<p>
														<Typography
															variant="subtitle2"
															color="initial"
															style={{
																fontSize: '12px',
															}}
														>
															{notification.description}
														</Typography>
													</p>
												</span>
												<span>
													<p>
														<Typography
															variant="subtitle2"
															color="initial"
															style={{
																fontSize: '10px',
															}}
														>
															{calcDate(notification.createdAt)}
														</Typography>
													</p>
												</span>
											</Link>
										</MenuItem>
									);
								})}
								<MenuItem>
									<Link
										style={{
											textDecoration: 'none',
										}}
										to="/notifications"
									>
										<span
											color="inherit"
											aria-label="add"
											className={classes.ali}
										>
											<Typography
												variant="subtitle2"
												color="initial"
												className={classes.ali}
												style={{
													justifyContent: 'center',
													fontSize: '14px',
													textTransform: 'uppercase',
													textAlign: 'center',
													color: purple[500],
												}}
											>
												Todas las notificaiones
											</Typography>
										</span>
									</Link>
								</MenuItem>
							</Menu>

							<Button
								aria-controls="simple-menu2"
								aria-haspopup="true"
								onClick={handleClick2}
							>
								<Avatar alt="User" src={user.picture} />
							</Button>
							<Menu
								id="simple-menu2"
								anchorEl={anchorEl2}
								keepMounted
								open={Boolean(anchorEl2)}
								onClose={handleClose2}
							>
								{/* <MenuItem>
                  <IconButton
                    color="inherit"
                    aria-label="add"
                    onClick={handleClose2}
                  >
                    <HighlightOffIcon fontSize='10px' />&nbsp;
                    <Typography variant="subtitle2" color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>
                      CLOSE
                    </Typography>
                  </IconButton>
                </MenuItem> */}

								{user?.roles?.includes('admin') ||
								user?.roles?.includes('superadmin') ? (
									<>
										<MenuItem>
											<span
												color="inherit"
												aria-label="add"
												onClick={() => history.push('/post')}
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
													color: grey[600],
												}}
											>
												<AddCircleOutlineIcon fontSize="10px" />
												&nbsp;
												<Typography
													variant="subtitle2"
													color="initial"
													style={{
														fontSize: '12px',
														textTransform: 'uppercase',
													}}
												>
													CREAR ARTICULO
												</Typography>
											</span>
										</MenuItem>
										<MenuItem>
											<span
												edge="end"
												color="inherit"
												onClick={() => history.push('/adminpanel')}
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
													color: grey[600],
												}}
											>
												<SettingsIcon fontSize="10px" />
												&nbsp;
												<Typography
													variant="subtitle2"
													color="initial"
													style={{
														fontSize: '12px',
														textTransform: 'uppercase',
													}}
												>
													PANEL DE ADMINISTRADOR
												</Typography>
											</span>
										</MenuItem>
									</>
								) : null}

								<MenuItem>
									<span
										edge="end"
										color="inherit"
										onClick={() => history.push(`/user/${user?.user_id}`)}
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											color: grey[600],
										}}
									>
										{/* <Link to={`/user/${user?.user_id}`}> */}
										<PersonOutlineIcon fontSize="10px" />
										&nbsp;
										<Typography
											variant="subtitle2"
											color="initial"
											style={{ fontSize: '12px', textTransform: 'uppercase' }}
										>
											PERFIL
										</Typography>
										{/* </Link> */}
									</span>
								</MenuItem>
								<MenuItem>
									<span
										edge="end"
										color="inherit"
										onClick={handleLogout}
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											color: grey[600],
										}}
									>
										<ExitToAppIcon fontSize="10px" />
										&nbsp;
										<Typography
											variant="subtitle2"
											color="initial"
											style={{ fontSize: '12px', textTransform: 'uppercase' }}
										>
											CERRAR SESION
										</Typography>
									</span>
								</MenuItem>
							</Menu>
						</>
					) : (
						<Link to={`/user/${user?.user_id}`}>
							<Avatar alt="User" src={userAvatar} />
						</Link>
					)}

					{/*<div className={classes.ocultReverse}>
             <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon style={{ color: '#ffffff' }} />
            </Button> */}
					{/* <Menu
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
                  <HighlightOffIcon fontSize='10px' />&nbsp;
                  <Typography variant="subtitle2" color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>
                    CLOSE
                  </Typography>
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton
                  color="inherit"
                  aria-label="add"
                  onClick={() => history.push("/post")}
                >
                  <AddCircleOutlineIcon  fontSize='10px' />&nbsp;
                  <Typography variant="subtitle2" color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>
                    ADD POST
                  </Typography>
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => history.push("/adminpanel")}
                >
                  <SettingsIcon fontSize='10px' />&nbsp;
                  <Typography variant="subtitle2" color="initial" style={{fontSize: '8px', textTransform: 'uppercase'}}>
                    PANEL ADMIN
                  </Typography>
                </IconButton>
              </MenuItem>
            </Menu> 
          </div>*/}
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
          <ListItemText style={{textTransform: 'uppercase'}}>Inicio</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/guiadetesis")}>
          <ListItemIcon>
            <BookOutlinedIcon />
          </ListItemIcon>
          <ListItemText style={{textTransform: 'uppercase'}}>Guía de Tesis</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/forum")}>
          <ListItemIcon>
            <ForumOutlinedIcon />
          </ListItemIcon>
          <ListItemText style={{textTransform: 'uppercase'}}>Foro</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/colaborators")}>
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText style={{textTransform: 'uppercase'}}>Colaboradores</ListItemText>
        </ListItem>
        <Divider />
        {/*{user?.roles?.includes("admin") ||
        user?.roles?.includes("superadmin") ? (
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
        <Divider />*/}
			</Drawer>
		</div>
	);
}
