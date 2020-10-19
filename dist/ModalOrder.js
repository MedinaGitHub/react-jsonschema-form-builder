function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

const ModalOrder = (listPropForm, uiSchemaSetOrder) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const desabledInputs = () => {
    try {
      var index = 0;

      for (const key in listPropForm.properties) {
        document.getElementById("root_" + index).disabled = true;
        index++;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (Object.keys(listPropForm.properties).length) {
      var justNames = [];

      for (const prop in listPropForm.properties) {
        justNames.push(listPropForm.properties[prop].id);
      }

      setFormData(justNames);
    }
  }, [listPropForm]);

  const onSubmit = () => {
    uiSchemaSetOrder(formData);
    handleClose();
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'contents'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: handleClickOpen
  }, "Ordenar o Eliminar"), /*#__PURE__*/React.createElement(Dialog, {
    onClose: handleClose,
    "aria-labelledby": "customized-dialog-title",
    open: open,
    onEntered: desabledInputs
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      'margin-top': '10px'
    }
  }, "Ordenar o eliminar un campo seg\xFAn id.")), /*#__PURE__*/React.createElement(DialogContent, null, formData && /*#__PURE__*/React.createElement("div", {
    id: "orderForm"
  }, /*#__PURE__*/React.createElement(Form, {
    schema: orderSchema,
    onSubmit: onSubmit,
    formData: formData,
    onChange: e => setFormData(e.formData)
  })))));
};

ModalOrder.PT = {
  listPropForm: PT.shape({
    properties: PT.arrayOf(PT.object)
  }),
  schemaOrder: PT.shape({
    properties: PT.arrayOf(PT.object),
    title: PT.string,
    description: PT.string,
    type: PT.string
  })
};
export default ModalOrder;