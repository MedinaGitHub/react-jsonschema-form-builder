function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/React.createElement(MuiDialogTitle, _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseIcon, null)) : null);
});
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);
export default function WrapperModal({
  close = null,
  onEntered = null,
  ...props
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (close != null) {
      handleClose();
    }
  }, [close]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'contents'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    id: 'btmopen_form',
    variant: "contained",
    color: "primary",
    onClick: handleClickOpen
  }, props.txtBtn), /*#__PURE__*/React.createElement(Dialog, {
    onClose: handleClose,
    "aria-labelledby": "customized-dialog-title",
    open: open,
    onEntered: onEntered
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose
  }), /*#__PURE__*/React.createElement(DialogContent, null, props.children)));
}