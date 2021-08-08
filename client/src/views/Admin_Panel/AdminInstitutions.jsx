import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstitutions,  updateInstitution, getOneInstitution, deleteInstitution } from '../../redux/actions/actionsInstitutions'
import { Table, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';



const createData = ({inst_id, inst_name, inst_descriptions}) => ({
    inst_id,
    inst_name,
    inst_descriptions,
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

    const onDelete = async (id) => {
        dispatch(deleteInstitution(id));
        const newRows = rows.filter(row => row.inst_id !== id);
        setRows(newRows);
    }   


    return (
        institutions.isFetching ?  <div>CARGANDO</div> :
        <Table size="small">
            <TableHead>
                <TableCell align="left">Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Eliminar</TableCell>
            </TableHead>
            <TableBody>
            {
            rows ? rows.map(row => (
                <TableRow key={row.inst_id}>
                    <CustomTableCell {...{row, name: "inst_name", onChange}}/>
                    <CustomTableCell {...{row, name: "inst_descriptions", onChange}}/>
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
                        <IconButton onClick={() => onDelete(row.inst_id)}>
                            <DeleteForeverIcon color="secondary"/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )) : <div>CARGANDO</div>
            }
            </TableBody>
        </Table>
    )
}

export default AdminInstitutions;
