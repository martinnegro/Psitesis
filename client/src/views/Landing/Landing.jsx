import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	loginWithGoogle,
	RegisterWithEmailPassword,
	LoginWithEmailPassword,
	loginWithFacebook,
	RecoveryPassword,
	clearErrors,
} from '../../redux/actions/actionsAuth';
import Carousel from './CarouselSlide';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Typography,
	TextField,
	Grid,
	Box,
	Paper,
} from '@material-ui/core';
import GoogleIcon from './GoogleIcon';
import Logo from './../../assets/Logo.png';


//validation
import { minLengthValidation, emailValidation, passwordValidation } from "../../utils/validations/formValidations";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
	root: {
		'input': {
			color: 'white',
			borderColor: 'white',
		},
		'color': 'white',
		'borderColor': 'white',
		'display': 'flex',
		'flexWrap': 'wrap',
		'& label.Mui-focused': {
			color: 'white',
			borderColor: '#000',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'white',
			color: 'white',
			borderColor: 'white',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				color: 'white',
				borderColor: 'white',
			},
			'&:hover fieldset': {
				color: 'white',
				borderColor: 'white',
			},
			'&.Mui-focused fieldset': {
				color: 'white',
				borderColor: 'white',
			},
		},
		'& .Mui-error': {
			color: 'white',
		},
		'& .MuiFormHelperText-root': {
			color: 'white',
		},
	},
	input: {
		color: 'white',
		borderColor: 'white',
	},
	left: {
		padding: theme.spacing(0),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		width: '100%',
		minHeight: '100vh',
		backgroundColor: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	right: {
		padding: theme.spacing(0),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		width: '100%',
		minHeight: '100vh',
		backgroundColor: '#800080',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	img: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
		width: '140px',
		height: '140px',
	},
	h1: {
		fontSize: 26,
		color: '#fff',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
	},
	text: {
		fontSize: 12,
		color: '#fff',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	text2: {
		fontSize: 12,
		color: '#4484e9',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	textField: {
		color: '#fff',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '40ch',
	},
	button_login: {
		'marginTop': theme.spacing(1),
		'marginBottom': theme.spacing(1),
		'backgroundColor': '#000000',
		'color': '#fff',
		'fontColor': '#fff',
		'fontWeight': 'bold',
		'width': '40ch',
		'border': '1px solid',
		'borderRadius': 6,
		'borderColor': '#fff',
		'&:hover': {
			backgroundColor: '#000000',
			color: '#4484e9',
			borderColor: '#4484e9',
		},
	},
	button_login_with_google: {
		'marginTop': theme.spacing(1),
		'marginBottom': theme.spacing(2),
		'backgroundColor': '#fff',
		'color': '#000',
		'fontColor': '#fff',
		'fontWeight': 'bold',
		'width': '40ch',
		'border': '1px solid',
		'borderRadius': 6,
		'borderColor': '#4484e9',
		'&:hover': {
			backgroundColor: '#fff',
			color: '#4484e9',
			borderColor: '#4484e9',
		},
	},
	content_separator_line: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	separator_line: {
		width: '40ch',
		borderTop: '1px solid #fff',
		color: '#fff',
	},
	icon: {
		padding: '0px 10px 0px 0px',
	},
}));

const Landing = (props) => {
	const { isAuthenticated, errors } = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [stateAuth, setStateAuth] = useState('Login');

	//validation......
	const [mensajeEmail, setMensajeEmail] = useState('')
	const [errorEmail, setErrorEmail] = useState(false)
	const [mensajeUsuario, setMensajeUsuario] = useState('')
	const [errorUsuario, setErrorUsuario] = useState(false)
	const [mensajePassword, setMensajePassword] = useState('')
	const [errorPassword, setErrorPassword] = useState(false)
	const [openSnack, setOpenSnack] = React.useState(false);
	function Alert(props) {
	  return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	//...validation

	const [inputLogin, setInputLogin] = useState({
		email: '',
		password: '',
	});
	const [inputLoginErrors, setInputLoginErrors] = useState({
		email: '',
		password: '',
	});
	const [inputRecoveryPassword, setInputRecoveryPassword] = useState({
		email: '',
	});
	const [inputRecoveryPasswordErrors, setInputRecoveryPasswordErrors] =
		useState({
			email: '',
		});
	const [inputRegister, setInputRegister] = useState({
		email: '',
		username: '',
		password: '',
	});
	const [inputRegisterErrors, setInputRegisterErrors] = useState({
		email: '',
		username: '',
		password: '',
	});
	useEffect(() => {
		if (errors?.type === 'login') {
			if (errors?.code === 'too_many_attempts') {
				setInputLoginErrors({
					...inputLoginErrors,
					email: 'Demasiados intentos fallidos. espera unos momentos!',
				});
			} else {
				setInputLoginErrors({
					email: 'Correo o contraseña equivocada.',
					password: 'Correo o contraseña equivocada.',
				});
			}
		} else if (errors?.type === 'register') {
		} else if (errors?.type === 'recovery-send') {
			setInputRecoveryPasswordErrors({
				email: 'Te acabamos de enviar un correo para reiniciar tu constaseña!',
			});
		}
		return () => dispatch(clearErrors());
	}, [dispatch, errors, inputLoginErrors]);

	const [formValid, setformValid] = useState({
		email:false,
		username: false,
		password: false,
	  });

	const showRecoveryPassword = (e) => {
		e.preventDefault();
		setStateAuth('RecoveryPassword');
	};

	const showLogin = (e) => {
		e.preventDefault();
		setStateAuth('Login');
	};
	const showRegister = (e) => {
		e.preventDefault();
		setStateAuth('Register');
	};

	const handleOnChangeRegister = (e) => {
		const {name, type} = e.target;
		const {	email,username,password} = formValid;

		if(type === 'email'){
			setformValid({
			  ...formValid,
			  [name]: emailValidation(e.target)
			})
			
			if(email === true){
			setErrorEmail(false)
			setMensajeEmail('Mail valido')
		  } else{
			setErrorEmail(true)
			setMensajeEmail('Ingrese un Mail valido')
		  }
		}

		  if(type === 'text'){
			setformValid({
			  ...formValid,
			  [name]: minLengthValidation(e.target,5)
			})

			if(username === true){
				setErrorUsuario(false)
				setMensajeUsuario('username valido')
			  } else{
				setErrorUsuario(true)
				setMensajeUsuario('minimo 6 caracters')
			  }
		  }

		  if(type === 'password'){
			setformValid({
			  ...formValid,
			  [name]: passwordValidation(e.target)
			})
			if(password === true){
				setErrorPassword(false)
				setMensajePassword('password valido')
			  } else{
				setErrorPassword(true)
				setMensajePassword('\n-Al menos 8 caracteres \n-Al menos una letra mayúscula \n-Al menos una letra minucula \n-Al menos un dígito \n-No espacios en blanco')
			  }
		  }

		setInputRegister({
			...inputRegister,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === 'password') {
			validatePassword(e.target.value);
		}
		if (e.target.name === 'email') {
			validateEmail(e.target.value);
		}
		if (e.target.name === 'username') {
			validateUsername(e.target.value);
		}		
	};

	const handleOnChangeRecoveryPassword = (e) => {
		setInputRecoveryPassword({
			...inputRecoveryPassword,
			[e.target.name]: e.target.value,
		});
		setInputRecoveryPasswordErrors({
			email: '',
		});
	};

	const handleOnChangeLogin = (e) => {
		const {name, type} = e.target;
		const {	email,password} = formValid;

		if(type === 'email'){
			setformValid({
			  ...formValid,
			  [name]: emailValidation(e.target)
			})
			
			if(email === true){
			setErrorEmail(false)
			setMensajeEmail('Mail valido')
		  } else{
			setErrorEmail(true)
			setMensajeEmail('Ingrese un Mail valido')
		  }
		}

		  if(type === 'password'){
			setformValid({
			  ...formValid,
			  [name]: passwordValidation(e.target)
			})
			if(password === true){
				setErrorPassword(false)
				setMensajePassword('password valido')
			  } else{
				setErrorPassword(true)
				setMensajePassword('')
			  }
		  }
		setInputLogin({
			...inputLogin,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === 'email') {
			setInputLoginErrors({
				...inputLoginErrors,
				email: '',
			});
		}
		if (e.target.name === 'password') {
			setInputLoginErrors({
				...inputLoginErrors,
				password: '',
			});
		}
	};

	const handleOnSubmitLogin = (e) => {
		e.preventDefault();
		if (!inputLogin.email || !inputLogin.password ) {
			setOpenSnack(true)
		}
		else{
			dispatch(LoginWithEmailPassword(inputLogin.email, inputLogin.password));
		}
	};
	const handleOnSubmitRegister = (e) => {
		e.preventDefault();
		if (
			!inputRegister.email||
			!inputRegister.username ||
			!inputRegister.password 
		) {
			setOpenSnack(true)
		}
		else{
			dispatch(
				RegisterWithEmailPassword(
					inputRegister.email,
					inputRegister.username,
					inputRegister.password
				)
			);
		}
	};

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenSnack(false);
	  };

	const handleOnSubmitRecoveryPassword = (e) => {
		e.preventDefault();
		if (inputRecoveryPassword.email !== '') {
			dispatch(RecoveryPassword(inputRecoveryPassword.email));
		}
	};

	const handlerLoginWithGoogle = (e) => {
		e.preventDefault();
		dispatch(loginWithGoogle());
	};

	const handlerLoginWithFacebook = (e) => {
		e.preventDefault();
		dispatch(loginWithFacebook());
	};

	const validateEmail = (email) => {
		const rex = /\S+@\S+\.\S+/;
		if (!rex.test(email)) {
			setInputRegisterErrors({
				inputRegisterErrors,
				email: 'Ingrese un correo electrónico!',
			});
		} else {
			setInputRegisterErrors({
				inputRegisterErrors,
				email: '',
			});
		}
	};

	const validateUsername = (username) => {
		if (username.length < 1) {
			setInputRegisterErrors({
				inputRegisterErrors,
				username: 'El usuario debe tener por lo menos 1 caracter!',
			});
		} else if (username.length > 15) {
			setInputRegisterErrors({
				inputRegisterErrors,
				username: 'El usuario no debe tener mas de 15 caracteres!',
			});
		} else {
			setInputRegisterErrors({
				inputRegisterErrors,
				username: '',
			});
		}
	};

	const validatePassword = (password) => {
		if (!/^(?=.*?[0-9])/.test(password)) {
			setInputRegisterErrors({
				inputRegisterErrors,
				password: 'La contraseña debe tener por lo menos un numero!',
			});
		} else if (!/(?=.*?[A-Z])/.test(password)) {
			setInputRegisterErrors({
				inputRegisterErrors,
				password: 'La contraseña debe tener por lo menos una mayuscula!',
			});
		} else if (!/(?=.*?[a-z])/.test(password)) {
			setInputRegisterErrors({
				inputRegisterErrors,
				password: 'La contraseña debe tener por lo menos una minuscula!',
			});
		} else if (password.length < 8) {
			setInputRegisterErrors({
				inputRegisterErrors,
				password: 'La contraseña debe tener por lo 8 caracteres!',
			});
		} else {
			setInputRegisterErrors({
				inputRegisterErrors,
				password: '',
			});
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/home" />;
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12} sm={6} lg={7} xl={8}>
					<Paper className={classes.left}>
						<Carousel />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} lg={5} xl={4} id='ingresar'>
					<Paper className={classes.right}>
						<Box>
							{stateAuth === 'Login' ? (
								<>
									<div>
										<img className={classes.img} src={Logo} alt="logo" />
										<Typography className={classes.h1}>Psitesis</Typography>
									</div>
									<Box>
										<TextField
											label="Correo electrónico"
											name="email"
											type="email"
											value={inputLogin.email}
											className={classes.textField}
											helperText={mensajeEmail}
											error={errorEmail}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.input,
											}}
											onChange={handleOnChangeLogin}
											margin="dense"
											variant="outlined"
										/>
									</Box>
									<Box>
										<TextField
											label="Contraseña"
											name="password"
											type="password"
											value={inputLogin.password}
											className={classes.textField}
											helperText={mensajePassword}
											error={errorPassword}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.input,
											}}
											onChange={handleOnChangeLogin}
											margin="dense"
											variant="outlined"
										/>
									</Box>

									<Box>
										<Button
											className={classes.button_login}
											onClick={handleOnSubmitLogin}
										>
											ingresar
										</Button>
										<Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
        								<Alert onClose={handleCloseSnack} severity="error">
          								Debe completar todos los campos!
        								</Alert>
      									</Snackbar>
									</Box>
									<Box>
										<Button
											className={classes.button_login_with_google}
											onClick={handlerLoginWithGoogle}
										>
											<GoogleIcon className={classes.icon} /> ingresar con
											google
										</Button>
									</Box>
									<div className={classes.content_separator_line}>
										<hr className={classes.separator_line} />
									</div>
									<Typography className={classes.text}>
										¿Primera ves en Psitesis?{' '}
										<a
											href="/"
											onClick={showRegister}
											className={classes.text2}
										>
											Crear una cuenta
										</a>
									</Typography>
									<Typography className={classes.text}>
										¿Olvidaste Tu contraseña?{' '}
										<a
											href="/"
											onClick={showRecoveryPassword}
											className={classes.text2}
										>
											Recuperar mi contraseña!
										</a>
									</Typography>
								</>
							) : stateAuth === 'RecoveryPassword' ? (
								<>
									<div>
										<img className={classes.img} src={Logo} alt="logo" />
										<Typography className={classes.h1}>
											Recuperación de contraseña
										</Typography>
									</div>
									<Box>
										<TextField
											label="Correo electrónico"
											name="email"
											value={inputRecoveryPassword.email}
											className={classes.textField}
											helperText={inputRecoveryPasswordErrors.email}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.input,
											}}
											onChange={handleOnChangeRecoveryPassword}
											margin="dense"
											variant="outlined"
										/>
									</Box>
									<Box>
										<Button
											className={classes.button_login}
											onClick={handleOnSubmitRecoveryPassword}
										>
											recuperar
										</Button>
									</Box>
									<div className={classes.content_separator_line}>
										<hr className={classes.separator_line} />
									</div>
									<Typography className={classes.text}>
										¿No nesecitas recuperar tu contraseña?{' '}
										<a href="/" onClick={showLogin} className={classes.text2}>
											Iniciar sesión
										</a>
									</Typography>
									<Typography className={classes.text}>
										¿Primera ves en Psitesis?{' '}
										<a
											href="/"
											onClick={showRegister}
											className={classes.text2}
										>
											Crear una cuenta
										</a>
									</Typography>
								</>
							) : (
								<>
									<div>
										<img className={classes.img} src={Logo} alt="logo" />
										<Typography className={classes.h1}>Psitesis</Typography>
									</div>
									<Box>
										<TextField
											label="Correo electrónico"
											name="email"
											type="email"
											value={inputRegister.email}
											className={classes.textField}
											helperText={mensajeEmail}
											error={errorEmail}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.input,
											}}
											onChange={handleOnChangeRegister}
											margin="dense"
											variant="outlined"
										/>
									</Box>
									<Box>
										<TextField
											label="Usuario"
											name="username"
											type="text"
											value={inputRegister.username}
											className={classes.textField}
											helperText={mensajeUsuario}
											error={errorUsuario}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.input,
											}}
											onChange={handleOnChangeRegister}
											margin="dense"
											variant="outlined"
										/>
									</Box>
									<Box>
										<TextField
											label="Contraseña"
											name="password"
											type="password"
											value={inputRegister.password}
											className={classes.textField}
											helperText={mensajePassword}
											error={errorPassword}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.input,
											}}
											onChange={handleOnChangeRegister}
											margin="dense"
											variant="outlined"
										/>
									</Box>
									<Box>
										<Button
											className={classes.button_login}
											onClick={handleOnSubmitRegister}
										>
											registrase
										</Button>
										<Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
        								<Alert onClose={handleCloseSnack} severity="error">
          								Debe completar todos los campos!
        								</Alert>
      									</Snackbar>
									</Box>
									<Box>
										<Button
											className={classes.button_login_with_google}
											onClick={handlerLoginWithGoogle}
										>
											<GoogleIcon className={classes.icon} /> registrar con
											google
										</Button>
									</Box>
									<div className={classes.content_separator_line}>
										<hr className={classes.separator_line} />
									</div>
									<Typography className={classes.text}>
										¿Ya tienes una Cuenta en Psitesis?{' '}
										<a href="/" onClick={showLogin} className={classes.text2}>
											Iniciar sesión
										</a>
									</Typography>
								</>
							)}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};
/*
	return (
		<div className="container-body">
			<div className="container">
				<form onSubmit={handleOnSubmit}>
					<div>user:</div>
					<div>
						<label>email</label>
						<input
							name="email"
							type="text"
							placeholder="Correo electrónico"
							value={input.email}
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<label>password</label>
						<input
							name="password"
							type="password"
							placeholder="Contraseña"
							value={input.password}
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<button type="submit">Entrar</button>
					</div>
					<div>
						<button onClick={handlerLoginWithGoogle}>Login con google</button>
					</div>
				</form>
			</div>
		</div>
	);
};*/

export default Landing;
