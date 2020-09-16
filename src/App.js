import React, { useState, useEffect } from 'react';
import './App.css';
import modalForm from './ModalForm';
import ModalOrder from './ModalOrder';
import Form from '@rjsf/material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import defaultSeed from "./seedSchema.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '50px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
function App({ getJsonSchemaForm, seedSchema }) {

  const validateParams = (getJsonSchemaForm, seedSchema) => {
    if (typeof getJsonSchemaForm !== 'function') {
      getJsonSchemaForm = (item) => { console.log(item) };
    }

    if (typeof seedSchema !== 'object') {
      seedSchema = defaultSeed;
    }
  }

  validateParams(getJsonSchemaForm, seedSchema);

  const classes = useStyles();
  const [jsonSchema, setJsonSchema] = useState(seedSchema);
  const [uiSchema, setUiSchema] = useState({});

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

  const deleteSchemas = (items) => {

    var justNames = [];
    for (const prop in jsonSchema.properties) {
      justNames.push(jsonSchema.properties[prop].id)
    }
    var difference = justNames.filter(x => items.indexOf(x) === -1);

    var beforeState = { ...jsonSchema };
    difference.forEach(prop => {
      delete beforeState.properties[prop]
    });
    setJsonSchema(prevState => ({ ...prevState, properties: beforeState.properties }));
  }

  const uiSchemaSetOrder = (items) => {
    deleteSchemas(items);
    items.push('*')
    setUiSchema((prevState) => ({
      ...prevState,
      "ui:order": items
    }));
  }

  const getNewProperties = (item) => {
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


    < div className={classes.root} >
      <Grid container direction="row"
        justify="center"
        alignItems="center" spacing={3}>
        <Grid item xs={6}  >
          <Paper className={classes.paper}>
            {modalForm(getNewProperties)}
            {ModalOrder(jsonSchema, uiSchemaSetOrder)}
            <Button onClick={() => getJsonSchemaForm({ jsonSchema, uiSchema })} variant="contained" color="primary"> Exportar  </Button >
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction="row"
        justify="center"
        alignItems="center" spacing={3}>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Form schema={jsonSchema}
              uiSchema={uiSchema} >
              <div>
                <button type="submit" style={{ display: "none" }}>Submit</button>
              </div>
            </Form>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div >


  );
}

export default App;

/*
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
              {ModalOrder(jsonSchema, uiSchemaSetOrder)}
              <Button onClick={() => getJsonSchemaForm({jsonSchema,uiSchema})} variant="contained" color="primary"> Exportar  </Button >
            </Paper>

          </Grid>

          <Grid justify="center" item lg={12} >
            <Paper className={classes.paper}>
              <Form schema={jsonSchema}
                uiSchema={uiSchema} >
                <div>
                  <button type="submit" style={{display:"none"}}>Submit</button>
                </div>
              </Form>
            </Paper>
            <Paper className={classes.paper}>
              <Form schema={jsonSchema}
                uiSchema={uiSchema} >
                <div>
                  <button type="submit" style={{display:"none"}}>Submit</button>
                </div>
              </Form>
            </Paper>
          </Grid>

        </Grid>

      </Grid>

    </div >
    */