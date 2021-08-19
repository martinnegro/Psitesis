import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import EditIcon from '@material-ui/icons/Edit';
import {
	getUserMetadata,
	createNewLinkInMetadata,
	deleteLinkInMetadata,
	clearUserMetadata,
	updateLinkInMetadata,
} from '../../../redux/actions/actionsMetadata';

const createData = (link, i) => ({
	index: i,
	base: link,
	url: link,
	isEditMode: false,
});
const CustomImput = ({ row, name, onChange }) => {
	return (
		<>
			{row.isEditMode ? (
				<Input
					value={row[name]}
					name={name}
					onChange={(e) => onChange(e, row)}
				/>
			) : null}
		</>
	);
};

const UserContactManager = ({ user }) => {
	const [isCreating, setIsCreating] = useState(false);
	const [open, setOpen] = useState({});
	const [rows, setRows] = useState([]);
	const [previous, setPrevious] = useState({});
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

	useEffect(() => {
		setRows((state) => {
			const aux = [];
			metadata?.links.forEach((link, i) => aux.push(createData(link, i)));
			aux.sort((a, b) => (a > b ? 1 : -1));
			return aux;
		});
	}, [metadata]);

	const handleOnChangeNewLink = (e) => {
		setNewLink(e.target.value);
	};

  const cancelNewLink = () => {
    setIsCreating(false);
    setNewLink("");
  };

  const confirmNewLink = async (newLink) => {
    if (newLink !== "") {
      if (metadata?.links) {
        if (!metadata?.links?.includes(newLink)) {
          dispatch(createNewLinkInMetadata(newLink, user.user_id_A0));
        }
      } else {
        dispatch(createNewLinkInMetadata(newLink, user.user_id_A0));
      }
    }
    setIsCreating(false);
    setNewLink("");
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

	const isEmail = (string) => {
		const Regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
		return Regex.test(string);
	};

	const onRevert = (index) => {
		const newRows = rows.map((row) =>
			row.index === index && previous[index]
				? { ...previous[index], isEditMode: false }
				: { ...row, isEditMode: false }
		);
		setRows(newRows);
		setPrevious((state) => {
			delete state[index];
			return state;
		});
	};

	const onUpdate = async (index) => {
		const body = rows.find((row) => row.index === index);
		await dispatch(updateLinkInMetadata(body, user.user_id_A0));
		onToggleEditMode(index);
	};

	const onToggleEditMode = (index) => {
		setRows(() => {
			return rows.map((row) =>
				row.index === index ? { ...row, isEditMode: !row.isEditMode } : row
			);
		});
	};

	const onChange = (e, row) => {
		if (!previous[row.index])
			setPrevious((state) => ({ ...state, [row.index]: row }));
		const value = e.target.value;
		const name = e.target.name;
		const { index } = row;
		const newRows = rows.map((row) =>
			row.index === index ? { ...row, [name]: value } : row
		);
		setRows(newRows);
	};

	return (
		<Box>
			<Box style={{ color: '#861C55', fontSize: '30px' }}>Contacto</Box>
			<Table>
				{rows.map((row) => (
					<TableRow>
						<TableCell>
							<CustomIcon link={row.url} height={'32px'} width={'32px'} />
						</TableCell>
						{row.isEditMode ? (
							<TableCell align="right">
								<CustomImput {...{ row, name: 'url', onChange }} />
								<IconButton onClick={() => onUpdate(row.index)}>
									<DoneIcon fontSize="small" />
								</IconButton>
								<IconButton onClick={() => onRevert(row.index)}>
									<CloseIcon fontSize="small" />
								</IconButton>
							</TableCell>
						) : (
							<TableCell align="right">
								<Link href={row.url} target="_blank">
									{isEmail(row.url) ? (
										<>Email</>
									) : row.url.toLowerCase().includes('linkedin') ? (
										<>Linkedin</>
									) : row.url.toLowerCase().includes('facebook') ? (
										<>Facebook</>
									) : (
										<>Link</>
									)}
								</Link>
								{user?.user_id_A0 === myUser?.user_id_A0 ||
								myUser?.roles?.includes('admin') ||
								myUser?.roles?.includes('superadmin') ? (
									<>
										<IconButton
											onClick={() => onToggleEditMode(row.index)}
											fontSize="small"
										>
											<EditIcon color="action" fontSize="small" />
										</IconButton>{' '}
										<IconButton>
											<DeleteForeverIcon
												onClick={() => {
													handleClickOpen(row.url);
												}}
												style={{ color: purple[500] }}
											/>
											<ConfirmDeleteContact
												open={open[row.url]}
												handleClose={handleClose}
												handleConfirm={handleConfirm}
												link={row.base}
											/>
										</IconButton>
									</>
								) : null}
							</TableCell>
						)}
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
