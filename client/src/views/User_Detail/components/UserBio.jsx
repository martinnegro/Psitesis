import React, { useState, useEffect } from 'react'
import { 
    Typography, 
    Input, 
    IconButton, 
    Button, 
    Box, 
    makeStyles, 
    Icon, 
    Dialog,
    DialogTitle, 
    DialogContent, 
    DialogActions 
} from '@material-ui/core';
import { deleteUserBio, editUserBio, getUserDetail } from '../../../redux/API';

import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import DoneIcon from "@material-ui/icons/Done";
import DeleteForever from '@material-ui/icons/DeleteForever';

const useStyle = makeStyles({
    root: {
    },
    bioAndButton: {
      display: 'flex',
      alignItems: 'center'
    },

  })

function UserBio({ user }) {
    const classes = useStyle();
    const [ wantEditBio, setWantEditBio ] = useState(false);
    const       [ input, setInput ]       = useState();
    const   [ canSubmit, setCanSubmit ]   = useState(false);
    const  [ wantDelete, setWantDelete ]  = useState(false);

    const onWantEdit = () => {
        setWantEditBio(true);
        setInput(user.biography);
    };
    
    const onCancelEdit = () => {
        setInput('');
        setWantEditBio(false);
    };

    const handleOnChange = (e) => {
        setInput(e.target.value);
        e.target.value !== user.biography ? setCanSubmit(true) : setCanSubmit(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{ 
            if (input !== user.biography){
                const response = await editUserBio(user.user_id_A0,input)
                setInput('');
                setWantEditBio(false)
                getUserDetail(user.user_id_A0)
            }
        } catch(err) { alert('No update') } 
    };

    const handleDelete = async () => {
        try {
            await deleteUserBio(user.user_id_A0);
            setWantDelete(false)
        } catch(err) { alert('No update') }
    };

    return (
        <div className={classes.root}>
        {   
            wantEditBio ?
            <Box>
                <Input 
                    value={input}
                    onChange={handleOnChange}
                    onSubmit={handleSubmit}
                /> 
                {
                    canSubmit ?
                    <IconButton onClick={handleSubmit}>
                        <DoneIcon />
                    </IconButton>
                    : null
                }
                <IconButton 
                    onClick={onCancelEdit}
                >
                    <Close />
                </IconButton>
            </Box>
            :
            <Box className={classes.bioAndButton}>
            <Typography>
                { user.biography ? user.biography : <div style={{ fontStyle: 'italic' }}>Añadir Bio</div> }
            </Typography>
            <IconButton 
                variant='contained'
                disableElevation
                onClick={onWantEdit}
            >
                <Edit style={ {fontSize: 20} }/>
            </IconButton>
            {/*   WANT DELETE    */}
            <IconButton onClick={()=>setWantDelete(true)}>
                <DeleteForever />
            </IconButton>
            <Dialog open={wantDelete}>
                <DialogTitle>
                    ¿Quieres borrar la bio?
                </DialogTitle>
                <DialogContent>
                    La bio debe ser borrada solo en caso de considarla inapropiada para el sitio
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete}>borrar</Button>
                    <Button onClick={()=>setWantDelete(false) }>cancelar</Button>
                </DialogActions>
            </Dialog>
            {/* ------------------ */}
            </Box> 
        }
        </div>
    )
}

export default UserBio
