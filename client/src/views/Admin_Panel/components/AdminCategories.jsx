import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
} from '@material-ui/core';
import {
	getAllCatSub,
	setCategory,
	deleteCategory,
	createNewCategory,
	setSubCategory,
	deleteSubCategory,
	createNewSubCategory,
} from '../../../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ConfirmAlertDeleteSubCategory from './ConfirmAlertDeleteSubCategory';
import ConfirmAlertDeleteCategory from './ConfirmAlertDeleteCategory';

const CustomInputCell = ({ newCat, name, handleNewCat }) => {
	return (
		<TableCell align="left">
			<Input
				value={newCat[name]}
				name={name}
				onChange={(e) => handleNewCat(e)}
			/>
		</TableCell>
	);
};

const CustomInputCellSub = ({ newSubCat, name, cat_id, handleNewSubCat }) => {
	return (
		<TableCell align="left">
			<Input
				value={newSubCat[cat_id][name]}
				name={name}
				onChange={(e) => handleNewSubCat(e, cat_id)}
			/>
		</TableCell>
	);
};

const CustomTableCell = ({ category, name, onChangeCategory }) => {
	return (
		<TableCell align="left">
			{category.isEditMode ? (
				<Input
					value={category[name]}
					name={name}
					onChange={(e) => onChangeCategory(e, category)}
				/>
			) : (
				category[name]
			)}
		</TableCell>
	);
};

const CustomTableCellSubCategory = ({
	subCategory,
	name,
	onChangeSubCategory,
}) => {
	return (
		<TableCell align="left">
			{subCategory.isEditMode ? (
				<Input
					value={subCategory[name]}
					name={name}
					onChange={(e) => onChangeSubCategory(e, subCategory)}
				/>
			) : (
				subCategory[name]
			)}
		</TableCell>
	);
};

const AdminCategories = () => {
	const { getAccessTokenSilently } = useAuth0();
	const categories = useSelector((state) => state.rootReducer.cat_sub);
	const dispatch = useDispatch();
	const [rowsCategories, setRowsCategories] = useState([]);
	const [previous, setPrevious] = useState({});
	const [previousSub, setPreviousSub] = useState({});

	useEffect(() => {
		dispatch(getAllCatSub());
	}, [dispatch]);

	useEffect(() => {
		if (Object.keys(categories).length > 0) {
			setRowsCategories((state) => {
				const auxCreatingSub = [];
				const auxNewSubCat = [];
				//const [newSubCat, setNewSubCat] = useState({});
				const aux = categories.cats.map((category) => {
					auxCreatingSub[category.cat_id] = false;
					auxNewSubCat[category.cat_id] = {
						name: '',
						description: '',
					};
					return {
						name: category.cat_name,
						id: category.cat_id,
						isEditMode: false,
						subCategories: categories.sub_cats
							.map((subCategory) => {
								if (subCategory.cat_id === category.cat_id) {
									return {
										id: subCategory.sub_cat_id,
										name: subCategory.sub_cat_name,
										cat_id: subCategory.cat_id,
										description: subCategory.sub_cat_description,
										isEditMode: false,
									};
								}
								return undefined;
							})
							.filter((notUndefined) => notUndefined !== undefined),
					};
				});
				setIsCreatingSub(auxCreatingSub);
				setNewSubCat(auxNewSubCat);
				return aux;
			});
		}
	}, [categories]);

	const onChangeSubCategory = (e, subCategory) => {
		if (!previousSub[subCategory.id])
			setPreviousSub((state) => ({ ...state, [subCategory.id]: subCategory }));
		const value = e.target.value;
		const name = e.target.name;
		const { id, cat_id } = subCategory;
		const newRows = rowsCategories.map((category) =>
			category.id === cat_id
				? {
						...category,
						subCategories: category.subCategories.map((subCategory) =>
							subCategory.id === id
								? { ...subCategory, [name]: value }
								: subCategory
						),
				  }
				: category
		);
		setRowsCategories(newRows);
	};

	const onChangeCategory = (e, category) => {
		if (!previous[category.id])
			setPrevious((state) => ({ ...state, [category.id]: category }));
		const value = e.target.value;
		const name = e.target.name;
		const { id } = category;
		const newRows = rowsCategories.map((category) =>
			category.id === id ? { ...category, [name]: value } : category
		);
		setRowsCategories(newRows);
	};

	const onUpdateCategory = async (id) => {
		const body = rowsCategories.find((category) => category.id === id);
		const token = await getAccessTokenSilently();
		dispatch(setCategory(body, token));
		onToggleEditMode(id);
	};

	const onUpdateSubCategory = async (sub_id, cat_id) => {
		const category = rowsCategories.find((category) => category.id === cat_id);
		const subCategory = category.subCategories.find(
			(subCategory) => subCategory.id === sub_id
		);
		const token = await getAccessTokenSilently();
		dispatch(setSubCategory(subCategory, token));
		onToggleEditModeSubCategory(cat_id, sub_id);
	};

	const onToggleEditMode = (id) => {
		setRowsCategories(() => {
			return rowsCategories.map((category) =>
				category.id === id
					? { ...category, isEditMode: !category.isEditMode }
					: category
			);
		});
	};

	const onToggleEditModeSubCategory = (id, idSub) => {
		setRowsCategories(() => {
			return rowsCategories.map((category) =>
				category.id === id
					? {
							...category,
							subCategories: category.subCategories.map((subCategory) =>
								subCategory.id === idSub
									? { ...subCategory, isEditMode: !subCategory.isEditMode }
									: subCategory
							),
					  }
					: category
			);
		});
	};

	const onRevert = (id) => {
		const newRows = rowsCategories.map((row) =>
			row.id === id && previous[id]
				? { ...previous[id], isEditMode: false }
				: { ...row, isEditMode: false }
		);
		setRowsCategories(newRows);
		setPrevious((state) => {
			delete state[id];
			return state;
		});
	};

	const onRevertSubCategory = (sub_id, cat_id) => {
		const newRows = rowsCategories.map((category) =>
			category.id === cat_id
				? {
						...category,
						subCategories: category.subCategories.map((subCategory) =>
							subCategory.id === sub_id && previousSub[sub_id]
								? { ...previousSub[sub_id], isEditMode: false }
								: { ...subCategory, isEditMode: false }
						),
				  }
				: category
		);
		setRowsCategories(newRows);
		setPreviousSub((state) => {
			delete state[sub_id];
			return state;
		});
	};

	const [open, setOpen] = useState({});

	useEffect(() => {
		const newOpen = {};
		rowsCategories &&
			rowsCategories.forEach((r) => (newOpen[r.cat_id] = false));
		setOpen(newOpen);
	}, [rowsCategories]);

	const [openSub, setOpenSub] = useState({});
	const handleClickOpenSub = (id) => {
		setOpenSub({
			...openSub,
			[id]: true,
		});
	};
	const handleCloseSub = (id) => {
		setOpenSub({
			...openSub,
			[id]: false,
		});
	};

	const handleConfirmSub = async (id) => {
		setOpenSub(false);
		const token = await getAccessTokenSilently();
		dispatch(deleteSubCategory(id, token));
	};

	const handleClickOpen = (id) => {
		setOpen({
			...open,
			[id]: true,
		});
	};

	const handleClose = (id) => {
		setOpen({
			...open,
			[id]: false,
		});
	};

	const handleConfirm = async (id) => {
		setOpen(false);
		const token = await getAccessTokenSilently();
		dispatch(deleteCategory(id, token));
	};

	const [isCreating, setIsCreating] = useState(false);
	const [isCreatingSub, setIsCreatingSub] = useState({});

	const initialNewCat = {
		name: '',
	};
	
	const [newCat, setNewCat] = useState(initialNewCat);
	const [newSubCat, setNewSubCat] = useState({});

	const handleNewCat = (e) => {
		setNewCat({
			...newCat,
			[e.target.name]: e.target.value,
		});
	};

	const handleNewSubCat = (e, cat_id) => {
		setNewSubCat({
			...newSubCat,
			[cat_id]: {
				...newSubCat[cat_id],
				[e.target.name]: e.target.value,
			},
		});
	};

	const cancelNewCat = () => {
		setIsCreating(false);
		setNewCat(initialNewCat);
	};

	const cancelNewCatSub = (id) => {
		setIsCreatingSub({
			...isCreatingSub,
			[id]: false,
		});
		setNewSubCat({
			...newSubCat,
			[id]: {
				name: '',
				description: '',
			},
		});
	};

	const confirmNewCat = async (newCategory) => {
		const token = await getAccessTokenSilently();
		dispatch(createNewCategory(newCategory, token));
		setIsCreating(false);
		setNewCat(initialNewCat);
	};

	const confirmNewSubCat = async (id) => {		
		const token = await getAccessTokenSilently();
		dispatch(createNewSubCategory({...newSubCat[id], id: id}, token));
		setIsCreatingSub({
			...isCreatingSub,
			[id]: false,
		});
		setNewSubCat({
			...newSubCat,
			[id]: {
				name: '',
				description: '',
			},
		});
	};
	
	return (
		<>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					Categorias
				</AccordionSummary>
				<AccordionDetails>
					<Table size="small" width="100%">
						<TableHead>
							<TableCell>Nombre</TableCell>
							<TableCell align="right">Editar</TableCell>
							<TableCell align="right">Eliminar</TableCell>
						</TableHead>
						<TableBody>
							{rowsCategories ? (
								rowsCategories.map((category) => (
									<TableRow key={category.id}>
										<CustomTableCell
											{...{ category, name: 'name', onChangeCategory }}
											component="th"
											scope="row"
										/>
										{category.isEditMode ? (
											<TableCell align="right">
												<IconButton>
													<DoneIcon
														onClick={() => onUpdateCategory(category.id)}
													/>
												</IconButton>
												<IconButton onClick={() => onRevert(category.id)}>
													<CloseIcon />
												</IconButton>
											</TableCell>
										) : (
											<TableCell align="right">
												<IconButton
													onClick={() => onToggleEditMode(category.id)}
												>
													<EditIcon color="action" />
												</IconButton>
											</TableCell>
										)}
										<TableCell align="right">
											<IconButton onClick={() => handleClickOpen(category.id)}>
												<DeleteForeverIcon color="secondary" />
											</IconButton>
											<ConfirmAlertDeleteCategory
												open={open[category.id]}
												handleClose={handleClose}
												handleConfirm={handleConfirm}
												name={category.name}
												id={category.id}
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<div>CARGANDO</div>
							)}
						</TableBody>
						{isCreating ? (
							<TableRow>
								<CustomInputCell {...{ newCat, name: 'name', handleNewCat }} />
								<TableCell align="right">
									<IconButton onClick={() => confirmNewCat(newCat)}>
										<DoneIcon />
									</IconButton>
								</TableCell>
								<TableCell>
									<IconButton onClick={() => cancelNewCat()}>
										<CloseIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						) : (
							<TableFooter align="center">
								<IconButton align="center" onClick={() => setIsCreating(true)}>
									<AddCircleOutlineIcon />
								</IconButton>
							</TableFooter>
						)}
					</Table>
				</AccordionDetails>
			</Accordion>
			{rowsCategories?.map((category) => (
				<Accordion key={category.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						Sub-Categorias de {category.name}
					</AccordionSummary>
					<AccordionDetails>
						<Table size="small" width="100%">
							<TableHead>
								<TableCell>Nombre</TableCell>
								<TableCell>Descripción</TableCell>
								<TableCell align="right">Editar</TableCell>
								<TableCell align="right">Eliminar</TableCell>
							</TableHead>
							{category.subCategories ? (
								category.subCategories?.map((subCategory) => (
									<TableRow key={subCategory.id}>
										<CustomTableCellSubCategory
											{...{ subCategory, name: 'name', onChangeSubCategory }}
											component="th"
											scope="row"
										/>
										<CustomTableCellSubCategory
											{...{
												subCategory,
												name: 'description',
												onChangeSubCategory,
											}}
										/>
										{subCategory.isEditMode ? (
											<TableCell>
												<IconButton>
													<DoneIcon
														onClick={() =>
															onUpdateSubCategory(
																subCategory.id,
																subCategory.cat_id
															)
														}
													/>
												</IconButton>
												<IconButton
													onClick={() =>
														onRevertSubCategory(
															subCategory.id,
															subCategory.cat_id
														)
													}
												>
													<CloseIcon />
												</IconButton>
											</TableCell>
										) : (
											<TableCell align="right">
												<IconButton
													onClick={() =>
														onToggleEditModeSubCategory(
															category.id,
															subCategory.id
														)
													}
												>
													<EditIcon color="action" />
												</IconButton>
											</TableCell>
										)}
										<TableCell align="right">
											<IconButton
												onClick={() => handleClickOpenSub(subCategory.id)}
											>
												<DeleteForeverIcon color="secondary" />
											</IconButton>
											<ConfirmAlertDeleteSubCategory
												open={openSub[subCategory.id]}
												handleClose={handleCloseSub}
												handleConfirm={handleConfirmSub}
												name={subCategory.name}
												id={subCategory.id}
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<div>CARGANDO</div>
							)}
							{isCreatingSub[category.id] ? (
								<TableRow>
									<CustomInputCellSub
										{...{
											newSubCat,
											name: 'name',
											cat_id: category.id,
											handleNewSubCat,
										}}
									/>
									<CustomInputCellSub
										{...{
											newSubCat,
											name: 'description',
											cat_id: category.id,
											handleNewSubCat,
										}}
									/>
									<TableCell align="right">
										<IconButton onClick={() => confirmNewSubCat(category.id)}>
											<DoneIcon />
										</IconButton>
									</TableCell>
									<TableCell>
										<IconButton onClick={() => cancelNewCatSub(category.id)}>
											<CloseIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							) : (
								<TableFooter align="center">
									<IconButton
										align="center"
										onClick={() =>
											setIsCreatingSub({
												...isCreatingSub,
												[category.id]: true,
											})
										}
									>
										<AddCircleOutlineIcon />
									</IconButton>
								</TableFooter>
							)}
						</Table>
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};

export default AdminCategories;
