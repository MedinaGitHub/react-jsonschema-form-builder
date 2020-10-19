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
import formBuilder from './schemasJson/formBuilder.json';

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

export const cleanTextToEnableId = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç¿?",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc__",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }

})();

export const handleSubmitModalForm = (formData, prefix) => {
    const newProp = { jsonSchema: {}, uiSchema: {} };

    newProp.jsonSchema.title = formData.title;

    if (formData.check_id === true) {
        formData.id = prefix + formData.title.toLowerCase().replace(/ /g, "_") + '_id';
        formData.id = cleanTextToEnableId(formData.id) 
    }
    newProp.jsonSchema.id = formData.id
    if (typeof formData.description != 'undefined') {
        newProp.uiSchema[formData.id] = { "ui:help": formData.description }
    }

    if (formData.required) {
        newProp.jsonSchema.isRequired = formData.required;
    }
    switch (formData.fieldType) {
        case "Entrada de texto":
            newProp.jsonSchema.type = "string";
            break;
        case "Selector":
            newProp.jsonSchema.type = "string";
            newProp.jsonSchema.enum = formData.options;
            let beforeObject = newProp.uiSchema[formData.id];
            newProp.uiSchema[formData.id] = { ...beforeObject, ...{ "ui:widget": "select" } }
            break;
        case "CheckBox":
            newProp.jsonSchema.type = "boolean";
            break;
        case "Radio buttons":
            newProp.jsonSchema.type = "boolean";
            let beforeObjectRadio = newProp.uiSchema[formData.id];
            newProp.uiSchema[formData.id] = { ...beforeObjectRadio, ...{ "ui:widget": "radio" } }
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

    return newProp
}

export default function ModalForm({ addItemForm, prefix = "" }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = ({ formData }, e) => {
        const newProp = handleSubmitModalForm(formData, prefix)
        addItemForm(newProp)
    };

    return (
        <div style={{ display: 'contents' }}>
            <Button id={'btmopen_form'} variant="contained" color="primary" onClick={handleClickOpen}>
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