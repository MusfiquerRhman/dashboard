import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

const ConfrimDeleteDialogue = (props) => {
    const {deleteOpen, handleCloseDelete, name, deleteForm} = props;
    return (
        <Dialog
            open={deleteOpen}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete - {`${name}`}?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseDelete}>Cancle</Button>
                <Button onClick={deleteForm} autoFocus color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfrimDeleteDialogue;