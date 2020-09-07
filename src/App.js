import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import modalForm from './modalForm';
import seedSchema from './seedSchema.json';
import Form from '@rjsf/material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    padding: theme.spacing(0, 3),
  },
  paper: {
    textAlign: '-webkit-center',
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
function App() {

  const classes = useStyles();
  const [jsonSchema, setJsonSchema] = useState(seedSchema);
  const [uiSchema, setUiSchema] = useState({});
  const [newField, setNewField] = useState();
  const [orderSchema, setOrderSchema] = useState();

  const validateRequired = (item, beforeState) => {
    if (item.jsonSchema.isRequired) {
      if (!beforeState.required) {
        beforeState.required = []
      }
      beforeState.required.push(item.jsonSchema.id)
      setJsonSchema(prevState => ({ ...prevState, required: beforeState.required }));
    }
  }

  const validateUiSchema = (item) => {
    if (Object.keys(item.uiSchema).length) {
      setUiSchema((prevState) => ({
        ...prevState,
        [item.jsonSchema.id]: item.uiSchema
      }));
    }
  }

  const getNewProperties = (item) => {

    console.log(jsonSchema)
    console.log(item)
    var beforeState = { ...jsonSchema };
    beforeState.properties[item.jsonSchema.id] = item.jsonSchema
    setJsonSchema(prevState => ({ ...prevState, properties: beforeState.properties }));
    validateRequired(item, beforeState);
    validateUiSchema(item);
  }

  useEffect(() => {
    console.log(jsonSchema)
  }, [jsonSchema]);

  return (
    <div className={classes.root}>
      <Grid
        style={{ height: '100vh' }}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >

        <Grid justify="center" item lg={12} >
          <Grid justify="center" direction="row" item lg={12} >
            <Paper className={classes.paper}>
              {modalForm(getNewProperties)}
              <Button variant="contained" color="primary"> Ordenar o Eliminar  </Button >
              <Button variant="contained" color="primary"> Guardar  </Button >
            </Paper>

          </Grid>

          <Grid justify="center" item lg={12} >
            <Paper className={classes.paper}>
              <Form schema={jsonSchema}
                uiSchema={uiSchema} />
            </Paper>
          </Grid>
        </Grid>

      </Grid>

    </div >
  );
}

export default App;
