import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Form from '@rjsf/material-ui';
import newSection from './schemasJson/newSection.json';
import { cleanTextToEnableId} from "./ModalNewField";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export const handleSubmitModalNewSection = (formData, prefix= '') => {
    const newProp = { jsonSchema: {} };

    newProp.jsonSchema.title = formData.title;
    newProp.jsonSchema.description = formData.description;

    if (formData.automatic_id === true) {
        formData.id = prefix + formData.title.toLowerCase().replace(/ /g, "_") + '_id';
        formData.id = cleanTextToEnableId(formData.id) 
    }
    newProp.jsonSchema.id = formData.id

    if (formData.isArray === true) {
        newProp.jsonSchema.type = "array";   
        newProp.jsonSchema.items = {
        }
    }else{
        newProp.jsonSchema.type = "object";   
        newProp.jsonSchema.properties = {
        }
    }
    return newProp
}

export default function ModalNewSection({ addItemForm, prefix}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = ({ formData }, e) => {
        const newProp = handleSubmitModalNewSection(formData, prefix)
        addItemForm(newProp)
    };

    return (
        <div style={{ display: 'contents' }}>
            <Button id={'btmopen_form'} variant="contained" color="primary" onClick={handleClickOpen}>
                Agregar Seccion
        </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Nuevo Seccion
           </DialogTitle>
                <DialogContent dividers>
                    <Form schema={newSection} onSubmit={onSubmit} />
                </DialogContent>
            </Dialog>
        </div>
    )
}