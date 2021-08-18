import React from 'react';
import { sendVerificationEmail } from '../../redux/actions/actionsAuth';
import Container from '@material-ui/core/Container';
import { makeStyles, createTheme } from '@material-ui/core';
import Nav from '../Nav/Nav';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

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
	offset: theme.mixins.toolbar,
	Home: {
		// marginLeft: theme.spacing(15),
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 700,
		marginTop: '20px',
		marginBottom: '30px',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

export default function VerifyEmail() {
	const classes = useStyles();
	const dispatch = useDispatch();

	function handleClick(e) {
		e.preventDefault();
		dispatch(sendVerificationEmail());
	}

	return (
		<div>
			<div className={classes.offset}></div>
			<Nav />
			<ThemeProvider theme={theme}>
				<Container className={classes.Home}>
					<h2>
						Por favor verifique el link de verificacion que fue enviado a su
						direccion
					</h2>
					<button onClick={handleClick}>
						Volver a enviar link de verificacion
					</button>
				</Container>
			</ThemeProvider>
		</div>
	);
}
