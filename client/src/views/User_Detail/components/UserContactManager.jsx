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
	clearUserMetadata,
} from '../../../redux/actions/actionsMetadata';

const UserContactManager = ({ user }) => {
	const [isCreating, setIsCreating] = useState(false);
	const [open, setOpen] = useState({});
	const [newLink, setNewLink] = useState('');
	const myUser = useSelector((state) => state.authReducer.user);
	const metadata = useSelector((state) => state.metadataReducer.metadata);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user?.user_id_A0) {
			dispatch(getUserMetadata(user.user_id_A0));
		}
		return () => dispatch(clearUserMetadata());
	}, [dispatch, user]);

	const handleOnChangeNewLink = (e) => {
		setNewLink(e.target.value);
	};

	const cancelNewLink = () => {
		setIsCreating(false);
		setNewLink('');
	};

	const confirmNewLink = async (newLink) => {
		if (newLink !== '') {
			if (metadata?.links) {
				if (!metadata?.links?.includes(newLink)) {
					dispatch(createNewLinkInMetadata(newLink, user.user_id_A0));
				}
			} else {
				dispatch(createNewLinkInMetadata(newLink, user.user_id_A0));
			}
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
		dispatch(deleteLinkInMetadata(link, user.user_id_A0));
	};

	return (
		<Box>
			<Box style={{ color: '#861C55', fontSize: '30px' }}>Contacto</Box>
			<Table>
				{metadata?.links?.map((link) => (
					<TableRow>
						<TableCell>
							<CustomIcon link={link} height={'42px'} width={'42px'} />
						</TableCell>
						<TableCell>
							<Link href={link} target="_blank">
								{link}
							</Link>
						</TableCell>
						{user?.user_id_A0 === myUser?.user_id_A0 ||
						myUser?.roles?.includes('admin') ||
						myUser?.roles?.includes('superadmin') ? (
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
						) : null}
					</TableRow>
				))}
			</Table>
			{myUser.user_id_A0 === user.user_id_A0 ||
			myUser?.roles?.includes('admin') ||
			myUser?.roles?.includes('superadmin') ? (
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
			) : (
				<></>
			)}
		</Box>
	);
};

export default UserContactManager;
