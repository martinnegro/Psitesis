import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstitutions } from '../../../redux/actions/actionsInstitutions'
import { Avatar, Box, IconButton, Link, makeStyles, Paper, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
const { REACT_APP_URL_API } = process.env;

const useStyle = makeStyles({
    container: {
        padding: "10px"
    },
    tableCell: {
        padding: "2px"
    },
    iconButton: {
        padding: "10px"
    },
    newInst: {
        display: "flex",
        alignItems: "center"
    }
})

function UserInstitutions({user}) {
    const classes = useStyle();
    const institutions = useSelector(state => state.institutionsReducer.institutions);
    const dispatch = useDispatch();
    const [ userInst, setUserInst ] = useState([]);
    const [ availableInst, setAvailableInst ] = useState([]);
    const [ wantAddInst, setWantAddInst ] = useState(false);
    const [ selectedInst, setSelectedInst ] = useState('-1');

    const user_roles = useSelector((state) => state.usersReducer.user_roles);
    const user_id    = useSelector((state) => state.usersReducer.user_id);

    useEffect(()=>{
        if (availableInst.length < 1) dispatch(getInstitutions());
        if (institutions) setUserInst(user.institutions)
    },[]);
    useEffect(()=>{
        if (institutions && user.institutions) {
            const aux = institutions.filter(i => !userInst.some(ui => ui.inst_id === i.inst_id));
            setAvailableInst(aux);
        }
    },[institutions,userInst]);
    const handleSelectedInst = (e) => {
        setSelectedInst(e.target.value)
        if (e.target.value !== '-1') setWantAddInst(true);
        else setWantAddInst(false);
    };
    const handleAddInst = async () => {
        try {
            const response = await axios.put(`${REACT_APP_URL_API}/users/add_inst?user_id_A0=${user.user_id_A0}&inst_id=${selectedInst}`);
            if ( response.status === 200 ) setUserInst(response.data);
            else alert('No se pudo agregar la Institución')
        } catch(err) {
            alert('No se pudo agregar la Institución')
        }
    };

    const handleDelete = async (inst_id) => {
        try {
            const response = await axios.delete(`${REACT_APP_URL_API}/users/delete_inst?user_id_A0=${user.user_id_A0}&inst_id=${inst_id}`);
            if ( response.status === 200 ) setUserInst(response.data);
            else alert('No se pudo borrar la Institución')
        } catch(err) { 
            alert('No se pudo borrar la Institución')
        }
    };

    return (
        <Paper className={classes.container}>
                <Box style={{color: "#861C55", fontSize: "30px"} }>
                    Instituciones
                </Box>
            <Table>
            { userInst.map(i => (
                <TableRow p>
                    <TableCell className={classes.tableCell} >
                        <Avatar alt={i.inst_name} src={i.inst_logo}/>
                    </TableCell>
                    <TableCell href={i.inst_link} className={classes.tableCell}>
                            {i.inst_link_logo}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        <Link href={i.inst_link}>
                            {i.inst_name}
                        </Link>
                     </TableCell>
                    <TableCell className={classes.tableCell}>{i.inst_descriptions}</TableCell>
                        {
                        user_id === user.user_id || user_roles?.includes('admin') ?
                        <TableCell className={classes.tableCell}>
                            <IconButton className={classes.iconButton}>
                                <DeleteForeverIcon onClick={()=>handleDelete(i.inst_id)}/>
                            </IconButton>
                        </TableCell> : <></>
                        }
                </TableRow>
            )) }
            </Table>
            {   
                user_id === user.user_id || user_roles?.includes('admin') ?
            <Box className={classes.newInst}>
                <FormControl /*className={classes.formControl}*/>
                    <InputLabel id="demo-simple-select-helper-label">Instituciones</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                    //   value={age}
                      onChange={handleSelectedInst}
                    >
                        <MenuItem value="-1">
                          <em>Ninguna</em>
                        </MenuItem>
                        {
                            availableInst.map(i => (
                                <MenuItem value={i.inst_id}>{i.inst_name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Elija la institutución y confirme la selección</FormHelperText>
                </FormControl>
                {
                wantAddInst ?        
                <IconButton onClick={handleAddInst}>
                    <AddCircleOutlineIcon/>
                </IconButton> 
                : <></>
                }
            </Box> : <></>
            }
        </Paper>
    )
}

export default UserInstitutions;
