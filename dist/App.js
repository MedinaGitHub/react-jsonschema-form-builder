import React from 'react';
import './App.css';
import ModalNewField from './ModalNewField';
import ModalSetOrder from './ModalSetOrder';
import ModalNewSection from './ModalNewSection';
import Form from '@rjsf/material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import { useJsonSchema } from './hooks/useJsonSchema';
import { useUiSchema } from './hooks/useUiSchema';
import { useFields } from './hooks/useFields';
import newFields from './schemasJson/newFields.json';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '50px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function App({
  getJsonSchemaForm,
  rootSchema,
  rootSchemaUi,
  prefix,
  customWidgets = {}
}) {
  const classes = useStyles();
  const {
    jsonSchema,
    addJsonSchema,
    deleteSchemas,
    analizeFieldsObjects
  } = useJsonSchema(rootSchema);
  const {
    uiSchema,
    addUiSchema,
    updateUiSchema,
    addOrder
  } = useUiSchema(rootSchemaUi);
  const {
    formFields,
    analizeChangeStructureModalFields
  } = useFields(newFields);
  const widgets = { ...customWidgets
  };

  const validateParams = (getJsonSchemaForm, prefix) => {
    if (typeof getJsonSchemaForm !== 'function') {
      getJsonSchemaForm = item => {
        console.log(item);
      };
    }

    if (typeof prefix !== 'string') {
      prefix = '';
    }
  };

  validateParams(getJsonSchemaForm, prefix);

  const addItemForm = item => {
    addJsonSchema(item.jsonSchema);
    let result = analizeFieldsObjects();
    analizeChangeStructureModalFields(result);
    if (item.uiSchema) addUiSchema(item.uiSchema);
    if (uiSchema["ui:order"]) addOrder(item.jsonSchema.id);
  };

  const updateUi = items => {
    deleteSchemas(items);
    updateUiSchema(items);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center",
    spacing: 3
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 5
  }, /*#__PURE__*/React.createElement(Paper, {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(ModalNewField, {
    formBuilder: formFields,
    addItemForm: addItemForm,
    prefix: prefix
  }), /*#__PURE__*/React.createElement(ModalNewSection, {
    addItemForm: addItemForm,
    prefix: prefix
  }), /*#__PURE__*/React.createElement(ModalSetOrder, {
    jsonSchema: jsonSchema,
    uiSchema: uiSchema,
    updateUi: updateUi
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: () => getJsonSchemaForm({
      jsonSchema,
      uiSchema
    }),
    variant: "contained",
    color: "primary"
  }, " ", /*#__PURE__*/React.createElement(SaveRoundedIcon, null), "  ")))), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center",
    spacing: 3
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 5
  }, /*#__PURE__*/React.createElement(Paper, {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(Form, {
    widgets: widgets,
    schema: jsonSchema,
    uiSchema: uiSchema
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      display: "none"
    }
  }, "Submit")))))));
}

export default App;