import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import React from 'react'

function ConfirmDeleteComment({ open, commentContent, handleDelete, setWantDelete }) {
    return (
        <Dialog open={open}>
            <DialogTitle>
                ¿Quieres borrar el comentario?
            </DialogTitle>
            <DialogContent>
                Una vez eliminado no se puede recuperar 
            </DialogContent>
            <DialogContent>
                {commentContent}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="primary">
                    BORRAR
                </Button>
                <Button onClick={()=>setWantDelete(false)} color="primary">
                    CANCELAR
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteComment
