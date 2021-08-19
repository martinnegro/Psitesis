import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Avatar, Paper } from '@material-ui/core';
import Nav from '../../components/Nav/Nav';
import UserInstitutions from './components/UserInstitutions';
import UserContactManager from './components/UserContactManager';
import UserArticles from './components/UserArticles';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail, clearUserDetail } from './../../redux/actions/usersActions';

const useStyles = makeStyles({
	head: {
		margin: '0 0 25px 0',
		padding: '20px 10px 10px 20px',

		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		height: '150px',
		width: '150px',
		margin: '0 20px 20px 0',
	},
});

function User_Detail(props) {
	const classes = useStyles(props);
	const userDetail = useSelector((state) => state.usersReducer.userDetail);
	const { user_id_A0 } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user_id_A0) {
			dispatch(getUserDetail(user_id_A0));
		}
		return () => dispatch(clearUserDetail());
	}, [dispatch, user_id_A0]);

	return (
		<Container>
			<Nav></Nav>
			<Box mt={12} ml={10}>
				{userDetail ? (
					<Box>
						<Paper className={classes.head}>
							<Avatar
								alt={userDetail.user_name}
								src={userDetail.user_img_profile}
								className={classes.avatar}
							/>
							<UserContactManager user={userDetail} />
						</Paper>
						<UserInstitutions user={userDetail} />
						<UserArticles user={userDetail} />
					</Box>
				) : (
					<div>CARGANDO</div>
				)}
			</Box>
		</Container>
	);
}

export default User_Detail;
