import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 700,
		marginTop: '20px',
		marginBottom: '30px',
	},
	Loading: {
		margin: theme.spacing(5),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	CircularProgress: {
		color: pink[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

const Loading = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.Loading}>
				<CircularProgress size={54} className={classes.CircularProgress} />
			</div>
		</div>
	);
}

export default Loading;
