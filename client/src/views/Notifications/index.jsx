import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { useSelector } from 'react-redux';
import {
	TableHead,
	Table,
	Container,
	makeStyles,
	Paper,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
	Box,
	Avatar,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
//Menu Bottom
import NavBottom from '../../components/NavBottom/NavBottom';

const useStyles = makeStyles((theme) => ({
	offset: theme.mixins.toolbar,
	notifications: {
		'paddingRight': theme.spacing(1),
		'paddingLeft': theme.spacing(9),
		'marginTop': theme.spacing(5),
		'display': 'flex',
		'flexDirection': 'column',
		'alignItems': 'center',
		'justifyContent': 'center',
		'@media (max-width: 601px)': {
			paddingRight: theme.spacing(0),
			paddingLeft: theme.spacing(0),
			marginLeft: theme.spacing(0),
		},
	},
	align: {
		flexGrow: 1,
		align: 'center',
		whiteSpace: 'normal',
		alignItems: 'center',
		textAlign: 'center',
		margin: 'auto',
		justifyContent: 'center',
	},
}));

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

const Notifications = () => {
	const { notifications } = useSelector((state) => state.notificationsReducer);
	const classes = useStyles();

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [notificationsLocal, setNotificationsLocal] = useState([]);

	const handleChange = (event, value) => {
		setPage(value);
		console.log(value);
		console.log(notificationsLocal.length);
	};

	useEffect(() => {
		setNotificationsLocal(notifications);
		setTotalPages(Math.ceil(notifications.length / 10));
	}, [notifications]);

	return (
		<Container>
			<div className={classes.offset}></div>
			<Nav />
			<Container className={classes.notifications}>
				<Container align="center" component={Paper}>
					<Table aria-label="custom pagination table">
						<TableHead>
							<TableRow>
								<TableCell className={classes.align} colspan="2">
									Notificationes
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{page === 1
								? notificationsLocal.slice(0, 10).map((row) => (
										<TableRow key={row.id}>
											<TableCell component="th" scope="row" align="center">
												<Link
													to={`/user/${row.sender.user_id_A0}`}
													style={{ textDecoration: 'none' }}
												>
													<Avatar
														alt={row.sender.user_id}
														src={row.sender.user_img_profile}
													/>
												</Link>
											</TableCell>
											<TableCell align="left">
												<span>
													{row.link ? (
														<Link
															to={`${row.link}`}
															style={{ textDecoration: 'none' }}
														>
															{row.description}
														</Link>
													) : (
														row.description
													)}
												</span>
												<br />
												<span>{calcDate(row.createdAt)}</span>
											</TableCell>
										</TableRow>
								  ))
								: notificationsLocal
										.slice((page - 1) * 10, (page - 1) * 10 + 10)
										.map((row) => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row" align="center">
													<Link
														to={`/user/${row.sender.user_id_A0}`}
														style={{ textDecoration: 'none' }}
													>
														<Avatar
															alt={row.sender.user_id}
															src={row.sender.user_img_profile}
														/>
													</Link>
												</TableCell>
												<TableCell align="left">
													<span>
														{row.link ? (
															<Link
																to={`${row.link}`}
																style={{ textDecoration: 'none' }}
															>
																{row.description}
															</Link>
														) : (
															row.description
														)}
													</span>
													<br />
													<span>{calcDate(row.createdAt)}</span>
												</TableCell>
											</TableRow>
										))}
						</TableBody>
						<TableFooter colspan="2">
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									className={classes.align}
									colspan="2"
								>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="center"
									>
										<Pagination
											count={totalPages}
											page={page}
											onChange={handleChange}
										/>
									</Box>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</Container>
			</Container>
			<br />
			<br />
			<br />
			<br />
			<NavBottom />
		</Container>
	);
};

export default Notifications;
