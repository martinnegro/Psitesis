import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../../redux/actions/usersActions';
import s from './AdminUser.module.css'

import { TextField, AccordionSummary, Box ,AccordionDetails, Avatar, Paper } from '@material-ui/core'

const { REACT_APP_URL_API } = process.env;


function AdminUsers() {
    const users = useSelector(state => state.usersReducer.users);
    const dispatch = useDispatch()
    const [ input, setInput ] = useState('')
    const [ filteredUsers, setFilteredUsers ] = useState([]);
    const initSelectUser = { selected: false };
    const [  selectedUser, setSelectedUser  ] = useState(initSelectUser);
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
        console.log(user_id_A0)
        const rols = await axios.post(`${REACT_APP_URL_API}/users/get_user_role`,{ user_id_A0 });
        console.log(rols.data)
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
                        <Box
                            onClick={()=>onSelect(u.user_id_A0)}
                            key={u.user_id_A0 || u.user_id} 
                            border={1} 
                            borderColor="grey.500"
                            width="25%" 
                            p={2}>
                                {u.user_name}
                        </Box>
                    ))
                }
            </div>
            {
                selectedUser.selected &&
                <Paper>
                    
                </Paper>
            }
        </div>
    )
}

export default AdminUsers
