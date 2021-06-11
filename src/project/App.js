import React from 'react';
import './App.css';
import ModalNewField from './ModalNewField';
import ModalSetOrder from './ModalSetOrder';
import ModalNewSection from './ModalNewSection';
import Form from '@rjsf/material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import { useJsonSchema } from './hooks/useJsonSchema'
import { useUiSchema } from './hooks/useUiSchema'
import { useFields } from './hooks/useFields'
import defaultNewField from './schemasJson/newFields.json';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

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
function App(
  { getJsonSchemaForm,
    rootSchema,
    rootSchemaUi,
    prefix,
    customWidgets = {},
    newFields = defaultNewField,
    newPropJsonSchema = () => { }
  }) {
  const classes = useStyles();
  const { jsonSchema, addJsonSchema, deleteSchemas, analizeFieldsObjects } = useJsonSchema(rootSchema);
  const { uiSchema, addUiSchema, updateUiSchema, addOrder } = useUiSchema(rootSchemaUi);
  const { formFields, analizeChangeStructureModalFields } = useFields(newFields);

  const widgets = {
    ...customWidgets
  };

  const validateParams = (getJsonSchemaForm, prefix) => {
    if (typeof getJsonSchemaForm !== 'function') {
      getJsonSchemaForm = (item) => { console.log(item) };
    }
    if (typeof prefix !== 'string') {
      prefix = '';
    }
  }
  validateParams(getJsonSchemaForm, prefix);

  const addItemForm = (item) => {
    addJsonSchema(item.jsonSchema)
    let result = analizeFieldsObjects();
    analizeChangeStructureModalFields(result)
    addUiSchema(item.uiSchema);
    addOrder(item.jsonSchema.id)
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
            <ModalNewField newPropJsonSchema={newPropJsonSchema} formBuilder={formFields} addItemForm={addItemForm} prefix={prefix} />
            <ModalNewSection addItemForm={addItemForm} prefix={prefix} />
            <ModalSetOrder jsonSchema={jsonSchema} uiSchema={uiSchema} updateUi={updateUi} />
            <Button onClick={() => getJsonSchemaForm({ jsonSchema, uiSchema })} variant="contained" color="primary"> <SaveRoundedIcon />  </Button >
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction="row"
        justify="center"
        alignItems="center" spacing={3}>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Form widgets={widgets} schema={jsonSchema}
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