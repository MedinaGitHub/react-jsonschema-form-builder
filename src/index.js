import React from 'react';
import ReactDOM from 'react-dom';
import App from './project/App';
import seedSchema from './project/schemasJson/seedSchema.json';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App
      getJsonSchemaForm={(item) => { console.log('el response', item) }}
      seedSchema={seedSchema}
      prefix={'formulario_'} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
