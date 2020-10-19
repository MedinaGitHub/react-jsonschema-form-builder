import React, { useState } from 'react';
import './App.css';
import ModalForm from './ModalForm';
import ModalOrder from './ModalOrder';
import Form from '@rjsf/material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import { useJsonSchema } from './useJsonSchema'
import { useUiSchema } from './useUiSchema'


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
function App({ getJsonSchemaForm, seedSchema, seedSchemaUi, prefix }) {

  const { jsonSchema, addJsonSchema, deleteSchemas } = useJsonSchema(seedSchema);
  const { uiSchema, addUiSchema, updateUiSchema } = useUiSchema(seedSchemaUi);

  const validateParams = (getJsonSchemaForm, prefix) => {
    if (typeof getJsonSchemaForm !== 'function') {
      getJsonSchemaForm = (item) => { console.log(item) };
    }
    if (typeof prefix !== 'string') {
      prefix = '';
    }
  }
  validateParams(getJsonSchemaForm, prefix);

  const classes = useStyles();

  const addItemForm = (item) => {
    addJsonSchema(item.jsonSchema)
    addUiSchema(item.uiSchema);
  }

  const updateUi = items => {
    deleteSchemas(items);
    updateUiSchema(items);
  }

  return (
    < div className={classes.root} >
      <Grid container direction="row"
        justify="center"
        alignItems="center" spacing={3}>
        <Grid item xs={5}  >
          <Paper className={classes.paper}>
            <ModalForm addItemForm={addItemForm} prefix={prefix} />
            <ModalOrder jsonSchema={jsonSchema} updateUi={updateUi} />
            <Button onClick={() => getJsonSchemaForm({ jsonSchema, uiSchema })} variant="contained" color="primary"> Guardar  </Button >
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
      </Grid>
    </div >
  );
}

export default App;