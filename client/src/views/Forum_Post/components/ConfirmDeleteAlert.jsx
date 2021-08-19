import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDeleteAlert({ open, handleCancel, handleConfirm, openOkDelete }) {
    const [okDelete, setOkDelete] = useState(false)

    
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">¿Quieres borrar el Post?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si confirmas, el post es borrado y no se puede recuperar.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">
              SÍ
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus>
              NO
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openOkDelete}
        >
            <DialogTitle id="alert-dialog-title">Post Borrado</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              Redirigiendo al foro...
              </DialogContentText>
            </DialogContent>
        </Dialog>
      </div>
    );
  }