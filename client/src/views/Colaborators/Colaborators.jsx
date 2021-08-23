import React from 'react';
import Container from '@material-ui/core/Container';
import { useEffect, useState } from 'react';
import { getInstitutions } from '../../redux/actions/actionsInstitutions';
import {
	getUsersAdmin,
	getUsersColaborator,
} from '../../redux/actions/usersActions';
import { getAllCollabs } from '../../redux/API';
import { useDispatch, useSelector } from 'react-redux';
import BiosContainer from '../../components/Bios/BiosContainer';
import Institutions from '../../components/Institutions/Institutions';
import Nav from '../../components/Nav/Nav';
import PropTypes from 'prop-types';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { purple, azul } from '@material-ui/core/colors';
import axios from 'axios';
const { REACT_APP_URL_API } = process.env;
const theme = createTheme({
	palette: {
		primary: {
			main: '#031927',
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
		secondary: {
			main: '#FCFCFF',
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		justifyContent: 'center',
	},
	offset: theme.mixins.toolbar,
	title: {
		marginTop: '20px',
		backgroundColor: 'purple',
		width: '100%',
		textAlign: 'center',
		color: 'white',
	},
	tabs: {
		backgroundColor: "#031927",
		'& .MuiTabs-flexContainer': {
			justifyContent: 'space-around',
		},
		'&:focus': {
			color: 'white',
		  }, 
		  "& .MuiTabs-indicator":{
			backgroundColor: 'white'
		  }
	},
    tabsText:{
		color: "#93827F",
		'&:focus': {
		  color: 'white',
		},
		
	  },
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
			styles={{ display: 'flex' }}
		>
			{value === index && (
				<Box p={3}>
					{/* <Typography > */}
					{children}
					{/* </Typography> */}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		'id': `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function Colaborators() {
	const dispatch = useDispatch();
	const [ collabs, setCollabs ] = useState()
	const institutions = useSelector(
		(state) => state.institutionsReducer.institutions
	);

	useEffect(async () => {
		const newCollabs = await getAllCollabs();
		setCollabs(newCollabs.data)
		dispatch(getInstitutions());
	}, [dispatch]);

	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container>
			<div className={classes.offset}></div>
			<Nav />
			<Container className={classes.title}>
				<Typography variant="h2">Colaboradores</Typography>
			</Container>
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs example"
						className={classes.tabs}
					>
						<Tab label="Bios" {...a11yProps(0)} className={classes.tabsText} />
						<Tab label="Instituciones" {...a11yProps(1)} className={classes.tabsText} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					
					{collabs?.map((user) => {
							return (
								<BiosContainer
									id={user.user_id_A0}
									key={user.user_id}
									userName={user.user_name}
									biography={user.biography}
									imgProfile={user.user_img_profile}
								></BiosContainer>
							);
						})}
				</TabPanel>
				<TabPanel value={value} index={1}>
					{institutions
						? institutions.map((x) => {
								return (
									<Institutions
										id={x.inst_id}
										key={x.inst_id}
										instName={x.inst_name}
										imageProfile={x.inst_logo}
										bio={x.inst_descriptions}
									></Institutions>
								);
						  })
						: null}
				</TabPanel>
			</div>
		</Container>
	);
}
