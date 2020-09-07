import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Form from '@rjsf/material-ui';
import formBuilder from './formBuilder.json';

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(getNewProperties) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const onSubmit = ({ formData }, e) => {
        const newProp = { jsonSchema: {}, uiSchema: {} };
        newProp.jsonSchema.title = formData.title;
        newProp.jsonSchema.id = formData.id;
        
        if(formData.required){
            newProp.jsonSchema.isRequired = formData.required;
        }
        switch (formData.fieldType) {
            case "Entrada de texto":
                newProp.jsonSchema.type = "string";
                break;
            case "Selector":
                newProp.jsonSchema.type = "string";
                newProp.uiSchema[formData.id] = { "ui:widget": "select" }
                break;
            case "CheckBox":
                newProp.jsonSchema.type = "boolean";
                break;
            case "Radio buttons":
                newProp.jsonSchema.type = "boolean";
                newProp.uiSchema[formData.id] = { "ui:widget": "radio" }
                break;
            case "Archivo":
                newProp.jsonSchema.type = "string";
                newProp.jsonSchema.format = "data-url";
                break;
            case "Fecha":
                newProp.jsonSchema.type = "string";
                newProp.jsonSchema.format = "date";
                break;

            default:
                break;
        }
        getNewProperties(newProp)
    };

    return (
        <div style={{ display: 'contents' }}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Agregar Campo
      </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Nuevo Campo
        </DialogTitle>
                <DialogContent dividers>

                    <Form schema={formBuilder} onSubmit={onSubmit} />

                </DialogContent>
            </Dialog>
        </div>
    );
}