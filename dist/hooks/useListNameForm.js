import React, { useState } from 'react';
export const useListNameForm = () => {
  const [listNameForm, setListNameForm] = useState(null);

  const transformJsonSchemaToList = jsonSchema => {
    if (Object.keys(jsonSchema.properties).length) {
      var justNames = [];

      for (const prop in jsonSchema.properties) {
        justNames.push(jsonSchema.properties[prop].id);
      }

      setListNameForm(justNames);
    }
  };

  const newList = list => {
    setListNameForm(list);
  };

  return {
    listNameForm,
    transformJsonSchemaToList,
    newList
  };
};