import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstitutions,  updateInstitution, deleteInstitution, createNewInstitution } from '../../../redux/actions/actionsInstitutions'
import { Table, TableHead, TableCell, TableBody, TableRow, TableFooter }  from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ConfirmAlert from './ConfirmAlert'


const createData = ({inst_id, inst_name, inst_descriptions, inst_link, inst_logo}) => ({
    inst_id,
    inst_name,
    inst_descriptions,
    inst_link,
    inst_logo,
    isEditMode: false
  });
  const CustomTableCell = ({row, name, onChange}) => {
    return (
        <TableCell align="left">
          { row.isEditMode ? (
            <Input
              value={row[name]}
              name={name}
              onChange={e => onChange(e, row)}
            />
          ) : (
            row[name]
          )}
        </TableCell>
      );
}

const CustomInputCell = ({newInst, name, handleNewInst}) => {
    return (
        <TableCell align="left">
            <Input
              value={newInst[name]}
              name={name}
              onChange={(e) => handleNewInst(e)}
            />
        </TableCell>
      );
}

function AdminInstitutions() {
    const institutions = useSelector(state => state.institutionsReducer)
    const dispatch = useDispatch();
    const [ rows, setRows] = useState([]);
    const [previous, setPrevious] = useState({});
    
    
    useEffect(()=> {
        dispatch(getInstitutions());
    },[dispatch])
    useEffect(()=>{
        setRows(state => {
            const aux = [];
            institutions.institutions.forEach(i => aux.push(createData(i)))
            aux.sort((a,b) => a.inst_name > b.inst_name ? 1 : -1);
            return aux;
        })
    },[institutions])

    const onToggleEditMode = (id) => {
        setRows(() => {
            return rows.map(row => row.inst_id === id ? {...row, isEditMode: !row.isEditMode}: row)
        });
    };
    const onChange = (e, row) => {
        if (!previous[row.inst_id]) setPrevious(state => ({ ...state, [row.inst_id]: row }));
        const value = e.target.value;
        const name = e.target.name;
        const { inst_id } = row;
        const newRows = rows.map(row => row.inst_id === inst_id ? { ...row, [name]: value } : row );
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => 
            (row.inst_id === id) && previous[id] ? {...previous[id], isEditMode: false} : {...row, isEditMode: false}
        );
        setRows(newRows);
        setPrevious(state => {
          delete state[id];
          return state;
        });
    };

    const onUpdate = async (id) => {
        const body = rows.find(row => row.inst_id === id);
        await dispatch(updateInstitution(id,body));
        onToggleEditMode(id);
    }

    // Maneja botón para delete. Alerta y dispatch de eliminar.
    const [open, setOpen] = useState({});
    useEffect(()=>{
        const newOpen = {};
        rows && rows.forEach(r => newOpen[r.inst_id] = false)
        setOpen(newOpen)
    },[rows])
    const handleClickOpen = (id) => {
        setOpen({
            ...open,
            [id]: true
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
        dispatch(deleteInstitution(id));
    }

    // Maneja nuevos inputs
    const [ isCreating, setIsCreating ] = useState(false);
    const initialNewInst = {
        inst_name: '',
        inst_descriptions: '',
        inst_link: '',
        inst_log: ''
    }
    const [ newInst, setNewInst ] = useState(initialNewInst);           
    const handleNewInst = (e) => {
        setNewInst({
            ...newInst,
            [e.target.name]: e.target.value
        })
    }                                
    const cancelNewInst = () => {
        setIsCreating(false);
        setNewInst(initialNewInst);
    }
    const confirmNewInst = (inst) => {
        dispatch(createNewInstitution(inst));
        setIsCreating(false);
        setNewInst(initialNewInst);
    }
    return (
        institutions.isFetching ?  <div>CARGANDO</div> :
        <Table size="small" width="100%">
            <TableHead>
                <TableCell align="left">Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Link Logo</TableCell>
                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Eliminar</TableCell>
            </TableHead>
            <TableBody>
            {
            rows ? rows.map(row => (
                <TableRow key={row.inst_id}>
                    <CustomTableCell {...{row, name: "inst_name", onChange}} component="th" scope="row"/>
                    <CustomTableCell {...{row, name: "inst_descriptions", onChange}}/>
                    <CustomTableCell {...{row, name: "inst_link", onChange}}/>
                    <CustomTableCell {...{row, name: "inst_logo", onChange}}/>
                    {   
                        row.isEditMode ? 
                        <TableCell align="right">
                            <IconButton>
                                <DoneIcon onClick={() => onUpdate(row.inst_id)}/>
                            </IconButton>
                            <IconButton onClick={() => onRevert(row.inst_id)}>
                                <CloseIcon/>
                            </IconButton>
                        </TableCell>:
                        <TableCell align="right">
                            <IconButton onClick={() => onToggleEditMode(row.inst_id)}>
                                <EditIcon color="action" />
                            </IconButton>
                        </TableCell>
                    }
                    <TableCell align="right" >
                        <IconButton onClick={() => handleClickOpen(row.inst_id)}>
                            <DeleteForeverIcon color="secondary"/>
                        </IconButton>
                        <ConfirmAlert 
                            open={open[row.inst_id]} 
                            handleClose={handleClose} 
                            handleConfirm={handleConfirm}
                            inst={row.inst_name} inst_id={row.inst_id}
                        />
                    </TableCell>
                </TableRow>
                
            )) : <div>CARGANDO</div>
            }
            {   isCreating ? 
                <TableRow>
                    <CustomInputCell {...{newInst, name: "inst_name", handleNewInst}}/>
                    <CustomInputCell {...{newInst, name: "inst_descriptions", handleNewInst}}/>
                    <CustomInputCell {...{newInst, name: "inst_link", handleNewInst}}/>
                    <CustomInputCell {...{newInst, name: "inst_logo", handleNewInst}}/>
                    <TableCell align="right">
                        <IconButton onClick={() => confirmNewInst(newInst)}>
                            <DoneIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => cancelNewInst()}>
                            <CloseIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                :
                <TableFooter align="center">
                        <IconButton align="center" onClick={()=> setIsCreating(true)}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                </TableFooter>
            }
            </TableBody>
        </Table>
    )
}

export default AdminInstitutions;
