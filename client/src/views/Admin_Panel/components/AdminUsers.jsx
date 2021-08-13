import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../../redux/actions/usersActions';
// import s from './AdminUser.module.css'
import './AdminUser.module.css'
import { Link } from 'react-router-dom';

import { TextField, Button, Box, IconButton, Avatar, makeStyles, Paper, Collapse } from '@material-ui/core'
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const { REACT_APP_URL_API } = process.env;

const useStyle = makeStyles({
    paper: {
        height: '165px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        
    },
    avatar: {
        width: '60px',
        height: '60px',
    },
    name: {
        fontSize: '1.1rem',
        textAlign: 'center',
        margin: '0 20px 0 20px',
        padding: '2px',
        width: '180px',
    },
    role: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paperForm: {
        margin: "5px",
        position: "relative"
    },
    form: {
        margin: "10px 10px 0 10px"
    },
    radioGroup: {
        margin: "10px 0 0 0"
    },
    radio: {
            height: "1.55rem"
    },
    iconButton: {
        padding: "0",
        margin: "10px 0 10px 0"
    }
})


function AdminUsers() {
    const classes = useStyle()
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
        <div /*className={s.container}*/>
            <form>
                <TextField id="user_name" label="Buscar usuarios" variant="outlined" size="small" 
                    value={input}
                    onChange={onSearch}
                />
            </form>
            <div /*className={s.usersContainer}*/>
                {
                    filteredUsers.map(u => (
                        <Zoom in={true}>
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
                        </Zoom>
                    ))
                }
            </div>
            {
                selectedUser.selected &&
                <Paper className={classes.paper} >
                    <Avatar alt={selectedUser.user_name} src={selectedUser.user_img_profile} className={classes.avatar}/>
                    <Link to={`/user/${selectedUser.user_id_A0}`}>
                        <Button variant="outlined" className={classes.name}>{selectedUser.user_name}</Button>
                    </Link>
                    <Box className={classes.role}>
                        <Box>                                
                            <Box ml={2}>Rol: {selectedUser.role.name}</Box>
                            <Button disabled={wantChangeRole} variant="outlined" onClick={() => handleWantChangeRole(selectedUser.role.id)}>Cambiar Rol</Button>
                        </Box> 
                        <Collapse in={wantChangeRole} className={classes.collapse}> 
                            <Paper className={classes.paperForm}>
                            <FormControl className={classes.form} component="fieldset" >
                                <FormLabel component="legend">Elija el rol y confirme el cambio</FormLabel>
                                <RadioGroup  className={classes.radioGroup} value={radioRole} onChange={(e) => onRadioChange(e)}>
                                    {selectedUser.roles.map(r => (
                                        <FormControlLabel 
                                            className={classes.radio} 
                                            key={r.id} 
                                            value={r.id} control={<Radio size="small"/>} 
                                            label={r.name} 
                                        />
                                    ))}
                                </RadioGroup>
                                <Box margin="0 0 0 30px">
                                    <IconButton 
                                        className={classes.iconButton}
                                        onClick={() => setWantChangeRole(false)}
                                    >
                                        <CloseIcon/>
                                    </IconButton>  
                                    {
                                        radioRole !== selectedUser.role.id ?
                                        <>
                                            <IconButton 
                                                className={classes.iconButton}
                                                onClick={() => confirmChangeRole(selectedUser.user_id_A0, selectedUser.role.id, radioRole)}
                                            >
                                                <DoneIcon/>
                                            </IconButton>  
                                        </> : <></>
                                    }
                                </Box>        
                            </FormControl>
                            </Paper>
                        </Collapse>
                    </Box>
                    <IconButton color="secondary" onClick={onClose}>
                        <CloseIcon color="default"/>
                    </IconButton>
                </Paper>
            }
        </div>
    )
}

export default AdminUsers
