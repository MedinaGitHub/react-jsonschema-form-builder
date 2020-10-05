function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
export default function ModalForm(getNewProperties, prefix = "") {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const normalize = function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++) mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
      var ret = [];

      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);else ret.push(c);
      }

      return ret.join('');
    };
  }();

  const onSubmit = ({
    formData
  }, e) => {
    const newProp = {
      jsonSchema: {},
      uiSchema: {}
    };
    newProp.jsonSchema.title = formData.title;

    if (formData.check_id == true) {
      formData.id = prefix + formData.title.toLowerCase().replace(/ /g, "_") + '_id';
      formData.id = normalize(formData.id);
    }

    newProp.jsonSchema.id = formData.id;

    if (typeof formData.description != 'undefined') {
      newProp.uiSchema[formData.id] = {
        "ui:help": formData.description
      };
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
        newProp.uiSchema[formData.id] = { ...beforeObject,
          ...{
            "ui:widget": "select"
          }
        };
        break;

      case "CheckBox":
        newProp.jsonSchema.type = "boolean";
        break;

      case "Radio buttons":
        newProp.jsonSchema.type = "boolean";
        let beforeObjectRadio = newProp.uiSchema[formData.id];
        newProp.uiSchema[formData.id] = { ...beforeObjectRadio,
          ...{
            "ui:widget": "radio"
          }
        };
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

    getNewProperties(newProp);
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'contents'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: handleClickOpen
  }, "Agregar Campo"), /*#__PURE__*/React.createElement(Dialog, {
    onClose: handleClose,
    "aria-labelledby": "customized-dialog-title",
    open: open
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose
  }, "Nuevo Campo"), /*#__PURE__*/React.createElement(DialogContent, {
    dividers: true
  }, /*#__PURE__*/React.createElement(Form, {
    schema: formBuilder,
    onSubmit: onSubmit
  }))));
}