import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
	root: {
	  color: theme.palette.getContrastText(purple[500]),
	  backgroundColor: purple[500],
	  '&:hover': {
		backgroundColor: purple[700],
	  },
	},
  }))(Button);
  
  const useStyles = makeStyles((theme) => ({
	margin: {
	  margin: theme.spacing(1),
	},
  }));

const LoginButton = ({ btnText, loginWith }) => {
	console.log(btnText, "aaaa")
	const { loginWithPopup, loginWithRedirect } = useAuth0();
	const classes = useStyles();
	function login() {
		switch (loginWith) {
			case 'Popup':
				loginWithPopup();
				break;
			case 'Redirect':
				loginWithRedirect();
				break;
			default:
				loginWithPopup();
				break;
		}
	}

	return <ColorButton onClick={() => login()}>{btnText}</ColorButton>;
};

export default LoginButton;
