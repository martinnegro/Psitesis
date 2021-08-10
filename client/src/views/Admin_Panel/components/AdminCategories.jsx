import React, { useEffect, useState } from 'react';
import {
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ConfirmAlertDeleteCategory from './ConfirmAlertDeleteCategory';

const createDataCategory = ({ cat_id, cat_name }) => ({
	cat_id,
	cat_name,
	isEditMode: false,
});

const CustomTableCell = ({ row, name, onChange }) => {
	return (
		<TableCell align="left">
			{row.isEditMode ? (
				<Input
					value={row[name]}
					name={name}
					onChange={(e) => onChange(e, row)}
				/>
			) : (
				row[name]
			)}
		</TableCell>
	);
};

const AdminCategories = () => {
	const [categories, setCategories] = useState(undefined);
	const [rowsCategories, setRowsCategories] = useState([]);
	const [previous, setPrevious] = useState({});

	const getAllCatSub = async () => {
		try {
			const response = await axios(`http://localhost:3001/categories`);
			setCategories(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const updateCategory = async (id, body) => {
		try {
			/*const response = await axios(`http://localhost:3001/categories`);
			setCategories(response.data);
			console.log(response.data);*/
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCatSub();
	}, []);

	useEffect(() => {
		if (categories) {
			setRowsCategories((state) => {
				const aux = [];
				categories.cats.map((i) => aux.push(createDataCategory(i)));
				aux.sort((a, b) => (a.cat_name > b.cat_name ? 1 : -1));
				return aux;
			});
		}
	}, [categories]);

	const onChange = (e, row) => {
		if (!previous[row.cat_id])
			setPrevious((state) => ({ ...state, [row.cat_id]: row }));
		const value = e.target.value;
		const name = e.target.name;
		const { cat_id } = row;
		const newRows = rowsCategories.map((row) =>
			row.cat_id === cat_id ? { ...row, [name]: value } : row
		);
		setRowsCategories(newRows);
	};

	const onUpdate = async (id) => {
		const body = rowsCategories.find((row) => row.inst_id === id);
		await updateCategory(id, body);
		onToggleEditMode(id);
	};

	const onToggleEditMode = (id) => {
		setRowsCategories(() => {
			return rowsCategories.map((row) =>
				row.cat_id === id ? { ...row, isEditMode: !row.isEditMode } : row
			);
		});
	};

	const onRevert = (id) => {
		const newRows = rowsCategories.map((row) =>
			row.cat_id === id && previous[id]
				? { ...previous[id], isEditMode: false }
				: { ...row, isEditMode: false }
		);
		setRowsCategories(newRows);
		setPrevious((state) => {
			delete state[id];
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

	const handleClickOpen = (id) => {
		setOpen({
			...open,
			[id]: true,
		});
	};

    const handleClose = (id) => {
        setOpen({
            ...open,
            [id]: false
        });
    };
    const handleConfirm = (id) => {  
        setOpen(false);
        //dispatch(deleteInstitution(id));
    }
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
						{rowsCategories ? (
							rowsCategories.map((row) => (
								<TableRow key={row.cat_id}>
									<CustomTableCell
										{...{ row, name: 'cat_name', onChange }}
										component="th"
										scope="row"
									/>
									{row.isEditMode ? (
										<TableCell align="right">
											<IconButton>
												<DoneIcon onClick={() => onUpdate(row.cat_id)} />
											</IconButton>
											<IconButton onClick={() => onRevert(row.cat_id)}>
												<CloseIcon />
											</IconButton>
										</TableCell>
									) : (
										<TableCell align="right">
											<IconButton onClick={() => onToggleEditMode(row.cat_id)}>
												<EditIcon color="action" />
											</IconButton>
										</TableCell>
									)}
									<TableCell align="right">
										<IconButton onClick={() => handleClickOpen(row.cat_id)}>
											<DeleteForeverIcon color="secondary" />
										</IconButton>
										<ConfirmAlertDeleteCategory
											open={open[row.cat_id]}
											handleClose={handleClose}
											handleConfirm={handleConfirm}
											cat={row.cat_name}
											cat_id={row.cat_id}
										/>
									</TableCell>
								</TableRow>
							))
						) : (
							<div>CARGANDO</div>
						)}
					</Table>
				</AccordionDetails>
			</Accordion>
			{categories
				? categories.cats.map((categorie) => (
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								Sub-Categorias de {categorie.cat_name}
							</AccordionSummary>
							<AccordionDetails>
								<Table size="small" width="100%">
									<TableHead>
										<TableCell>Nombre</TableCell>
										<TableCell>Descripción</TableCell>
										<TableCell align="right">Editar</TableCell>
										<TableCell align="right">Eliminar</TableCell>
									</TableHead>
									{categories?.sub_cats.map((subCategorie) => {
										if (categorie.cat_id === subCategorie.cat_id) {
											return (
												<TableRow key={subCategorie.sub_cat_name}>
													<TableCell>{subCategorie.sub_cat_name}</TableCell>
													<TableCell>
														{subCategorie.sub_cat_description}
													</TableCell>
													<TableCell align="right">Editar</TableCell>
													<TableCell align="right">Eliminar</TableCell>
												</TableRow>
											);
										} else {
											return null;
										}
									})}
								</Table>
							</AccordionDetails>
						</Accordion>
				  ))
				: null}
		</>
	);
};

export default AdminCategories;
