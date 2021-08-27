import React, { useState, useEffect } from 'react'
import { 
  Typography, 
  Input, 
  IconButton, 
  Box, 
  makeStyles,
  Dialog,
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button 
} from '@material-ui/core';
import { editUserName, getUserDetail, deleteUserName } from '../../../redux/API';

import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import DoneIcon from "@material-ui/icons/Done";
import DeleteForever from '@material-ui/icons/DeleteForever';

const useStyle = makeStyles({
  nameAndButton: {
    display: 'flex'
  }
})

const   ChangeNickName = ({ user }) =>{
    const classes = useStyle();
    const [ wantEditName, setWantEditName ] = useState(false);
    const        [ input, setInput ]        = useState();
    const    [ canSubmit, setCanSubmit ]    = useState(false);
    const  [ wantDelete, setWantDelete ]    = useState(false);

    const onWantEdit = () => {
        setWantEditName(true);
        setInput(user.user_name);
    };
    
    const onCancelEdit = () => {
        setInput('');
        setWantEditName(false);
    };

    const handleOnChange = (e) => {
        setInput(e.target.value);
        e.target.value !== user.user_name ? setCanSubmit(true) : setCanSubmit(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{ 
            if (input !== user.user_name){
                const response = await editUserName(user.user_id_A0,input)
                setInput('');
                setWantEditName(false)
                getUserDetail(user.user_id_A0)
            }
        } catch(err) { alert('No update') } 
    };

    const handleDelete = async () => {
      try {
          await deleteUserName(user.user_id_A0);
          setWantDelete(false)
      } catch(err) { alert('No update') }
    };

    return(
      <>
      {   
          wantEditName ?
          <Box >
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
          <Box className={classes.nameAndButton}>
            <Typography style={{ color: '#861C55', fontSize: '30px' }}>
                { user.user_name ? user.user_name : <div style={{fontStyle: 'italic'}}>Agregar Nombre</div> }
            </Typography>
            <IconButton 
                onClick={onWantEdit}
            >
                <Edit />
            </IconButton>
            {/*   WANT DELETE    */}
            <IconButton onClick={()=>setWantDelete(true)}>
                <DeleteForever />
            </IconButton>
            <Dialog open={wantDelete}>
                <DialogTitle>
                    ¿Quieres borrar el nombre?
                </DialogTitle>
                <DialogContent>
                    El nombre debe ser borrado solo en caso de considarlo inapropiado para el sitio
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete}>borrar</Button>
                    <Button onClick={()=>setWantDelete(false) }>cancelar</Button>
                </DialogActions>
            </Dialog>
            {/* ------------------ */}
          </Box> 
      } 
      </>
    )
}

export default ChangeNickName