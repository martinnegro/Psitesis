import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	IconButton,
	Link,
	Table,
	TableCell,
	TableRow,
	TableFooter,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useAuth0 } from '@auth0/auth0-react';
import CustomIcon from './CustomIcon';
import { purple, red, green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import ConfirmDeleteContact from './ConfirmDeleteContact';
import {
	getUserMetadata,
	createNewLinkInMetadata,
	deleteLinkInMetadata,
} from '../../../redux/actions/actionsMetadata';

const UserContactManager = ({ user }) => {
	const { getAccessTokenSilently } = useAuth0();
	const [isCreating, setIsCreating] = useState(false);
	const [open, setOpen] = useState({});
	const [newLink, setNewLink] = useState('');
	const dispatch = useDispatch();
	const userMetadata = useSelector((state) => state.metadataReducer.metadata);

	useEffect(() => {
		const constGetUserMetadata = async () => {
			const token = await getAccessTokenSilently();
			dispatch(getUserMetadata(user.user_id_A0, token));
		};
		constGetUserMetadata();
	}, [dispatch, getAccessTokenSilently, user.user_id_A0]);

	const handleOnChangeNewLink = (e) => {
		setNewLink(e.target.value);
	};

	const cancelNewLink = () => {
		setIsCreating(false);
		setNewLink('');
	};

	const confirmNewLink = async (newLink) => {
		if (!userMetadata?.metadata?.links?.includes(newLink) && newLink !== '') {
			const token = await getAccessTokenSilently();
			dispatch(createNewLinkInMetadata(newLink, user.user_id_A0, token));
		}
		setIsCreating(false);
		setNewLink('');
	};

	const handleClickOpen = (link) => {
		setOpen({
			...open,
			[link]: true,
		});
	};

	const handleClose = (link) => {
		setOpen({
			...open,
			[link]: false,
		});
	};

	const handleConfirm = async (link) => {
		setOpen(false);
		const token = await getAccessTokenSilently();
		dispatch(deleteLinkInMetadata(link, user.user_id_A0, token));
	};

	return (
		<Box>
			<Box style={{ color: '#861C55', fontSize: '30px' }}>
				Contacto:
			</Box>
			<Table>
				{userMetadata?.metadata?.links?.map((link) => (
					<TableRow>
						<TableCell>
							<CustomIcon link={link} height={'42px'} width={'42px'} />
						</TableCell>
						<TableCell>
							<Link href={link} target="_blank">
								{link}
							</Link>
						</TableCell>
						<TableCell>
							<IconButton>
								<DeleteForeverIcon
									onClick={() => {
										handleClickOpen(link);
									}}
									style={{ color: purple[500] }}
								/>
								<ConfirmDeleteContact
									open={open[link]}
									handleClose={handleClose}
									handleConfirm={handleConfirm}
									link={link}
								/>
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</Table>
			<Table>
				{isCreating ? (
					<TableRow>
						<TableCell>
							<CustomIcon link={newLink} height={'42px'} width={'42px'} />
						</TableCell>
						<TableCell>
							<Input
								align="center"
								value={newLink}
								name={'link'}
								onChange={(e) => handleOnChangeNewLink(e)}
							/>
						</TableCell>
						<TableCell align="right">
							<IconButton
								onClick={() => {
									confirmNewLink(newLink);
								}}
								style={{ color: green[500] }}
							>
								<DoneIcon />
							</IconButton>
						</TableCell>
						<TableCell>
							<IconButton onClick={cancelNewLink} style={{ color: red[500] }}>
								<CloseIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				) : (
					<TableFooter align="center">
						<TableCell align="center">
							Agregar forma de contacto
							<IconButton
								align="center"
								onClick={() => setIsCreating(true)}
								style={{ color: purple[500], height: '42px', width: '42px' }}
							>
								<AddCircleOutlineIcon />
							</IconButton>
						</TableCell>
					</TableFooter>
				)}
			</Table>
		</Box>
	);
};

export default UserContactManager;
