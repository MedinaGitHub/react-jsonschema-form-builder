import React, { useState } from 'react';
import defaultSeed from "./schemasJson/seedSchema.json";

export const useJsonSchema = (seedSchema = JSON.parse(JSON.stringify(defaultSeed))) => {
    const [jsonSchema, setJsonSchema] = useState(seedSchema);
    const addJsonSchema = (item) => {
        var newJsonSchema = { ...jsonSchema };
        newJsonSchema.properties[item.id] = item
        if (item.isRequired) {
            if (!newJsonSchema.required) {
                newJsonSchema.required = []
            }
            newJsonSchema.required.push(item.id)
        }
        setJsonSchema(newJsonSchema);
    }

    const deleteSchemas = (idesThatContinue) => {
        var All_ids = [];
        for (const prop in jsonSchema.properties) {
            All_ids.push(jsonSchema.properties[prop].id)
        }
        var idsToDelete = All_ids.filter(x => idesThatContinue.indexOf(x) === -1);

        var newJsonSchema = { ...jsonSchema };
        idsToDelete.forEach(prop => {
            delete newJsonSchema.properties[prop]
        });

        if (typeof newJsonSchema.required != 'undefined') {
            newJsonSchema.required = newJsonSchema.required.filter(x => !idsToDelete.includes(x))
            if (newJsonSchema.required.length == 0) {
                delete newJsonSchema.required
            }
        }

        setJsonSchema(newJsonSchema);
    }

    return { jsonSchema, addJsonSchema, deleteSchemas }
}