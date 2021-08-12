import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Avatar } from '@material-ui/core';
import Nav from '../../components/Nav/Nav';
import UserInstitutions from './components/UserInstitutions';
const { REACT_APP_URL_API } = process.env;

const useStyles = makeStyles({
    avatar: {
        height: '150px', width: '150px',
        margin: '0 20px 20px 0'
    },
  });

function User_Detail(props) {
    const classes = useStyles(props);
    const [ user, setUser ] = useState();
    const { user_id_A0 } = useParams();

    useEffect(async ()=>{
        const auxUser = await axios.get(`${REACT_APP_URL_API}/users/${user_id_A0}`);
        setUser(auxUser.data);
    },[])

    return (
        <Container>
            <Nav></Nav>
            <Box mt={12} ml={10}>
                {
                    user ?
                    <Box>
                        <Avatar alt={user.user_name} src={user.user_img_profile} className={classes.avatar}/>
                        <UserInstitutions user={user}/> 
                    </Box>
                    :
                    <div>CARGANDO</div>
                }
            </Box>
        </Container>
    )
}

export default User_Detail
