import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../../redux/actions/usersActions';
import s from './AdminUser.module.css'
import { Link } from 'react-router-dom';

import { TextField, Button, Box, IconButton, Avatar } from '@material-ui/core'
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';


const { REACT_APP_URL_API } = process.env;


function AdminUsers() {
    const users = useSelector(state => state.usersReducer.users);
    const dispatch = useDispatch()
    const [ input, setInput ] = useState('')
    const [ filteredUsers, setFilteredUsers ] = useState([]);
    const initSelectUser = { selected: false };
    const [  selectedUser, setSelectedUser  ] = useState(initSelectUser);
    const [  wantChangeRole, setWantChangeRole ] = useState(false);
    const [ radioRole, setRadioRole ] = useState(false);
    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
     
    const onSearch = (e) => {
        setInput(e.target.value)
    };

    // Busqueda de users
    useEffect(()=>{
        if (users.length > 0){
            if (input.length > 0) {
            const newFiltered = users.filter(u => u.user_name.toLowerCase().includes(input.toLowerCase()))
            setFilteredUsers(newFiltered)
            } else setFilteredUsers([])
        }
    },[input])

    const onSelect = async (user_id_A0) => {
        const response = await axios.post(`${REACT_APP_URL_API}/users/get_role`,{ user_id_A0 });
        const user = filteredUsers.find(u => u.user_id_A0 === user_id_A0)
        let role = response.data.role[0];
        const roles = response.data.roles
        if (!role) role = { id: 'rol_RXyaFjSO2qcD4KNG', name: 'basic' }
        setSelectedUser({
            selected: true,
            role,
            roles,
            ...user,
        });
        setWantChangeRole(false);
        
    }
    const onClose = () => {
        setSelectedUser({ selected: false })
    }

    const handleWantChangeRole = (id) => {
        setWantChangeRole(true);
        setRadioRole(id);
    };
    const onRadioChange = (e, rolId) => {
        setRadioRole(e.target.value);
    };
    const confirmChangeRole = async (idUser, oldRoleId, newRolId) => {
        const response = await axios.put(`${REACT_APP_URL_API}/users/change_role`,{ idUser, oldRoleId, newRolId });
        alert(response.data.message);
        setWantChangeRole(false);
        onSelect(idUser)
    }   

    return (
        <div className={s.container}>
            <form>
                <TextField id="user_name" label="Buscar usuarios" variant="outlined" size="small" 
                    value={input}
                    onChange={onSearch}
                />
            </form>
            <div className={s.usersContainer}>
                {
                    filteredUsers.map(u => (
                        <Box m={1} width="25%">
                            <Button
                                onClick={()=>onSelect(u.user_id_A0)}
                                key={u.user_id_A0 || u.user_id} 
                                variant="contained"
                                disableElevation  
                                >
                                    {u.user_name}
                            </Button>
                        </Box>
                    ))
                }
            </div>
            {
                selectedUser.selected &&
                <Box display="flex" m={2} >
                    <Avatar alt={selectedUser.user_name} src={selectedUser.user_img_profile}/>
                    <Link to={`/user/${selectedUser.user_id_A0}`}>
                        <Box ml={2}>{selectedUser.user_name}</Box>
                    </Link>
                    <Box>
                        {   
                            !wantChangeRole ?
                            <Box>
                                
                                <Box ml={2}>Rol: {selectedUser.role.name}</Box>
                                
                                <Button variant="outlined" onClick={() => handleWantChangeRole(selectedUser.role.id)}>Cambiar Rol</Button>
                            </Box> : 
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Elija el rol y confirme el cambio</FormLabel>
                                <RadioGroup size="small" aria-label="gender" name="gender1" value={radioRole} onChange={(e) => onRadioChange(e)}>
                                    {selectedUser.roles.map(r => (
                                        <FormControlLabel key={r.id} value={r.id} control={<Radio />} label={r.name} />
                                    ))}
                                </RadioGroup>
                                <Box>
                                            <IconButton>
                                                <CloseIcon onClick={() => setWantChangeRole(false)}/>
                                            </IconButton>  
                                    {
                                        radioRole !== selectedUser.role.id ?
                                        <>
                                            <IconButton>
                                                <DoneIcon onClick={() => confirmChangeRole(selectedUser.user_id_A0, selectedUser.role.id, radioRole)}/>
                                            </IconButton>  
                                        </> : <></>
                                    }
                                </Box>        
                            </FormControl>
                        }
                    </Box>
                    <IconButton color="secondary" onClick={onClose}>
                        <CloseIcon color="default"/>
                    </IconButton>
                </Box>
            }
        </div>
    )
}

export default AdminUsers
