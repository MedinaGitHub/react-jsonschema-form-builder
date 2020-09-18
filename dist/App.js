import React, { useState } from 'react';
import './App.css';
import modalForm from './ModalForm';
import ModalOrder from './ModalOrder';
import Form from '@rjsf/material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import defaultSeed from "./schemasJson/seedSchema.json";
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
  seedSchema,
  prefix
}) {
  const validateParams = (getJsonSchemaForm, seedSchema) => {
    if (typeof getJsonSchemaForm !== 'function') {
      getJsonSchemaForm = item => {
        console.log(item);
      };
    }

    if (typeof seedSchema !== 'object') {
      seedSchema = defaultSeed;
    }

    if (typeof prefix !== 'string') {
      prefix = '';
    }
  };

  validateParams(getJsonSchemaForm, seedSchema, prefix);
  const classes = useStyles();
  const [jsonSchema, setJsonSchema] = useState(seedSchema);
  const [uiSchema, setUiSchema] = useState({});

  const validateRequired = (item, beforeState) => {
    if (item.jsonSchema.isRequired) {
      if (!beforeState.required) {
        beforeState.required = [];
      }

      beforeState.required.push(item.jsonSchema.id);
      setJsonSchema(prevState => ({ ...prevState,
        required: beforeState.required
      }));
    }
  };

  const validateUiSchema = item => {
    debugger;
    console.log('uiSchema', uiSchema);

    if (Object.keys(item.uiSchema).length) {
      setUiSchema(prevState => ({ ...prevState,
        [item.jsonSchema.id]: item.uiSchema[item.jsonSchema.id]
      }));
    }
  };

  const deleteSchemas = items => {
    var justNames = [];

    for (const prop in jsonSchema.properties) {
      justNames.push(jsonSchema.properties[prop].id);
    }

    var difference = justNames.filter(x => items.indexOf(x) === -1);
    var beforeState = { ...jsonSchema
    };
    difference.forEach(prop => {
      delete beforeState.properties[prop];
    });
    setJsonSchema(prevState => ({ ...prevState,
      properties: beforeState.properties
    }));
  };

  const uiSchemaSetOrder = items => {
    deleteSchemas(items);
    items.push('*');
    setUiSchema(prevState => ({ ...prevState,
      "ui:order": items
    }));
  };

  const getNewProperties = item => {
    var beforeState = { ...jsonSchema
    };
    beforeState.properties[item.jsonSchema.id] = item.jsonSchema;
    setJsonSchema(prevState => ({ ...prevState,
      properties: beforeState.properties
    }));
    validateRequired(item, beforeState);
    validateUiSchema(item);
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
  }, modalForm(getNewProperties, prefix), ModalOrder(jsonSchema, uiSchemaSetOrder), /*#__PURE__*/React.createElement(Button, {
    onClick: () => getJsonSchemaForm({
      jsonSchema,
      uiSchema
    }),
    variant: "contained",
    color: "primary"
  }, " Guardar  ")))), /*#__PURE__*/React.createElement(Grid, {
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