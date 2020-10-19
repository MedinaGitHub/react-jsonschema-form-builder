import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Form from '@rjsf/material-ui';
import PT from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import orderSchema from './schemasJson/orderSchema.json';
import Button from '@material-ui/core/Button';
import { useListNameForm } from './useListNameForm'

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


const ModalOrder = ({ jsonSchema, updateUi }) => {

    const [open, setOpen] = useState(false);
    const { listNameForm, transformJsonSchemaToList, newList } = useListNameForm();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const desabledInputs = () => {
        try {
            var index = 0;
            for (const key in jsonSchema.properties) {
                document.getElementById("root_" + index).disabled = true;
                index++;
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        transformJsonSchemaToList(jsonSchema)
    }, [jsonSchema]);

    const onSubmit = () => {
        updateUi(listNameForm);
        handleClose();
    }

    return (

        <div style={{ display: 'contents' }}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Ordenar o Eliminar
        </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} onEntered={desabledInputs} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div style={{ 'margin-top': '10px' }}>Ordenar o eliminar un campo según id.</div>
                </DialogTitle>
                <DialogContent>
                    {listNameForm &&
                        <div id="orderForm">
                            <Form schema={orderSchema} onSubmit={onSubmit} formData={listNameForm} onChange={e => newList(e.formData)} />
                        </div>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

ModalOrder.PT = {
    jsonSchema: PT.shape({
        properties: PT.arrayOf(PT.object)
    }),
    schemaOrder: PT.shape({
        properties: PT.arrayOf(PT.object),
        title: PT.string,
        description: PT.string,
        type: PT.string,
    })
}

export default ModalOrder;