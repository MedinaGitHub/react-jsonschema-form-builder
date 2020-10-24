import React, { useState } from 'react';
export const useFields = structureJsonSchemaOfModalFields => {
  const [formFields, setFields] = useState(structureJsonSchemaOfModalFields);

  const analizeChangeStructureModalFields = result => {
    const newFields = { ...formFields
    };

    if (result.enumKeys.length > 0) {
      newFields.properties.sections = {
        type: "string",
        title: "Sección donde estará este campo",
        enum: ["root", ...result.enumKeys],
        enumNames: ["Sección Principal", ...result.enumNameKeys]
      };
      setFields(newFields);
    } else {
      if (newFields.properties.sections) {
        delete newFields.properties.sections;
        setFields(newFields);
      }
    }
  };

  return {
    formFields,
    analizeChangeStructureModalFields
  };
};