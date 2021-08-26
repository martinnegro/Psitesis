import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {createPostForum} from '../../redux/actions/actions';
import {getSubtopic} from '../../redux/actions/forumActions'
import Nav from '../../components/Nav/Nav';
import { useHistory, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
//MODAL
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//menucito
import NavBottom from '../../components/NavBottom/NavBottom';
import Container from '@material-ui/core/Container';
import SelectTopic from '../../components/SelectTopic/SelectTopic';

const theme = createTheme({
	palette: {
		primary: {
			main: purple[500],
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
		secondary: {
			main: purple[500],
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
	},
});

const useStyles = makeStyles({
	offset: theme.mixins.toolbar,
	root: {
		'color': '#ffffff',
		'backgroundColor': purple[500],
		'&:hover': {
			backgroundColor: purple[700],
		},
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid purple',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: '80%',
	},
	paper2: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid purple',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: '10%',
		'@media (max-width: 601px)': {
			maxWidth: '50%',
		},
	},
	Home: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tipoh2: {
		'@media (max-width: 601px)': {
			marginTop: 0,
			fontSize: '1.75rem',
			marginBottom: '10px',
		},
	},
	anchoInput: {
		'marginTop': 20,
		'width': '50vw',
		'@media (max-width: 601px)': {
			width: '80vw',
		},
	},
});

export default function Post() {

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSubtopic())
	},[dispatch])
	
	const { user }= useSelector((state) => state.authReducer);

	const classes = useStyles();

	
	const [body, setBody] = useState('');
	const [titulo, setTitulo] = useState('');
	const [subTopic, setSubTopic] = useState('');
	

	//Modal
	const [open, setOpen] = React.useState(false);
	const [on, setOn] = React.useState('1');

	const handleOpen = () => {
		setOpen(true);
		setOn('0');
	};

	const handleClose = () => {
		setOpen(false);
		setOn('1');
	};

	const history = useHistory();

	const hoy = new Date(Date.now());
	const date = hoy.toLocaleDateString();

	const handleBody = (e) => {
		setBody(e);
	};

	const handleInput = (e) => {
		setTitulo(e.target.value);
	};

	

	const handleInputTopic = (e) => {

		let index = e.target.selectedIndex;
		let option = e.target.options[index].value;
		console.log('option: ', option);
		
		setSubTopic(option.split('/')[1]);
	};

	const handleSubmitBody = async (e) => {
		e.preventDefault();

		let data = {
			post_contents: body,
			post_title: titulo,
			sub_topic_id: subTopic,
			user_id: user.user_id,
			post_date: date,
		};

		console.log('data: ', data);

			dispatch(createPostForum(data));
			setBody('');
			setTitulo('');
			setTextModal('creada');
			setOpen2(true);
			setTimeout(handleClose2, 1000);
		
	};



	const [open2, setOpen2] = React.useState(false);

	const handleClose2 = () => {
		setOpen2(false);
		history.push('/forum');
	};

	//Texto Modal
	const [textModal, setTextModal] = useState('');

	return (
		<div>
			<div className={classes.offset}></div>
			<Nav />
			<ThemeProvider theme={theme}>
				{/* <header className={`${style.contenedor_editor} ${style.centrado}`}> */}
				<Container className={classes.Home}>
					<Typography variant="h2" color="initial" className={classes.tipoh2}>
						NUEVO POST FORO
					</Typography>
					<br />
					<div>
						<TextField
							id="standard-basic"
							label="Titulo"
							name="titulo"
							type="text"
							value={titulo}
							onChange={handleInput}
							required
						/>
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
						<FormControl>
							<InputLabel htmlFor="grouped-native-select">Topics</InputLabel>
							<Select
								native
								defaultValue=""
								id="grouped-native-select"
								onChange={handleInputTopic}
								required
							>
								<option aria-label="None" value="" />
								<SelectTopic />
							</Select>
						</FormControl>
					</div>
					<br />
					<br />
					<br />
					<ReactQuill
						placeholder="Escribe aqui ...."
						modules={Post.modules}
						formats={Post.formats}
						onChange={handleBody}
						value={body}
					/>
					<br />
					
					<br />
					<br />
					<div>
						
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
						<div>
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								className={classes.modal}
								open={open}
								onClose={handleClose}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<Fade in={open}>
									<div className={classes.paper}>
										<Typography>{titulo}</Typography>
										<br />
										<Typography variant="body2">
											<span
												dangerouslySetInnerHTML={{
													__html: `${body}`,
												}}
											/>
										</Typography>
									</div>
								</Fade>
							</Modal>
						</div>
						<Button
							variant="contained"
							size="medium"
							color="primary"
							onClick={handleSubmitBody}
							classes={{
								root: classes.root,
								label: classes.label,
							}}
						>
							{console.log(id)}
							{id ? 'EDITAR POST' : 'POSTEAR'}
						</Button>
					</div>
					<div>
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							className={classes.modal}
							open={open2}
							onClose={handleClose2}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							<Fade in={open2}>
								<div className={classes.paper2}>
									<p id="transition-modal-description">Publicacion {textModal}</p>
								</div>
							</Fade>
						</Modal>
					</div>
				</Container>
				{/* </header>         */}
			</ThemeProvider>
			<br />
			<br />
			<br />
			<br />
			<NavBottom />
		</div>
	);
}

Post.modules = {
	toolbar: [
		[{ header: '1' }, { header: ['2', '3', '4', '5', '6'] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image'],
		[{ align: [] }],
		[{ color: [] }],
	],
};

Post.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'blockquote',
	'list',
	'bullet',
	'link',
	'image',
	'align',
	'color',
];


