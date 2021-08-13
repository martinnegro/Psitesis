import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDeleteContact({
	open,
	handleClose,
	link,
	handleConfirm,
}) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					¿Quieres borrar esta forma de contacto: {link}?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Si confirmas, borraras esta forma de contacto!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleConfirm(link)} color="primary">
						SÍ
					</Button>
					<Button onClick={() => handleClose(link)} color="primary" autoFocus>
						NO
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
