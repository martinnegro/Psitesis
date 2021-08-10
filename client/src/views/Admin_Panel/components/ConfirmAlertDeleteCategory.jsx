import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmAlertDeleteCategory({
	open,
	handleClose,
	cat,
	cat_id,
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
					¿Quieres borrar {cat}?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Si confirmas, la categoria sera borrada y no se podra recuperar.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleConfirm(cat_id)} color="primary">
						SÍ
					</Button>
					<Button onClick={() => handleClose(cat_id)} color="primary" autoFocus>
						NO
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
