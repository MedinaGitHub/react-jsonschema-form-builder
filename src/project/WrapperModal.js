import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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


export default function WrapperModal({ close= null, onEntered= null, ...props}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(() => {
        if(close != null){
            handleClose();
        }
    }, [close]);

    return (
        <div style={{ display: 'contents' }}>
            <Button id={'btmopen_form'} variant="contained" color="primary" onClick={handleClickOpen}>
                {props.txtBtn}
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} onEntered={onEntered} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {/*props.txtTitle*/}
                </DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
            </Dialog>
        </div>
    );
}